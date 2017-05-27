/* global Masonry */
/* global imagesLoaded */

import Ember from 'ember';
import layout from '../templates/components/masonry-grid';

const MASONRY_OPTION_KEYS = Ember.A([
	'containerStyle',
	'columnWidth',
	'percentPosition',
	'gutter',
	'hiddenStyle',
	'isFitWidth',
	'isInitLayout',
	'isOriginLeft',
	'isOriginTop',
	'isResizeBound',
	'itemSelector',
	'stamp',
	'transitionDuration',
	'stagger',
	'visibleStyle'
]);

export default Ember.Component.extend({
	layout,
	classNames: ['masonry-grid'],

	// masonry default options
	// overriding the default `isInitLayout` value allows us to attach an event for
	// `layoutComplete` before the first render
	isInitLayout: false,
	itemSelector: '.masonry-item',
	attributeBindings: ['masonryGridStyle:style'],

	masonryGridStyle: Ember.String.htmlSafe('position: relative'),

	masonry: null,

	itemClass: Ember.computed('options.itemSelector', function() {
		return this.get('options.itemSelector').replace('.', '');
	}),
	itemSizer: Ember.computed('options.columnWidth', function() {
		if ( typeof this.get('options.columnWidth') === 'string' ){
			return this.get('options.columnWidth').replace('.', '');
		}else{
			return false;
		}
	}),

	init() {

		this._super(...arguments);

		this.set('options' , this._computeOptions() );
	},

	observesLayout(){
		Ember.run.debounce( this, this._layoutMasonry , 80 );
	},

	didRender() {
		let self = this;
		if (this.isDestroyed) {
			return;
		}

		this._super(...arguments);

		let masonry = this.get('masonry'),
		options = this.get('options');

		Ember.run.scheduleOnce('afterRender', this, () => {
			imagesLoaded( this.get('element') , () => {
				if (masonry) {
					masonry.reloadItems();
				} else {

					if (self.isDestroyed) {
						return;
					}
					masonry = new Masonry(
						this.get('element'),
						options
					);

					masonry.on('layoutComplete', (layout) => {
						this.sendAction('layoutComplete', layout);
					});
					this.set('masonry', masonry );
				}

				masonry.layout();
			});
		});
	},

	willDestroyElement() {

		this._super(...arguments);
		this._destroyMasonry();
	},

	_computeOptions() {
		let self = this,
		options = this.get('config') ? this.get('config') : this.getProperties( MASONRY_OPTION_KEYS);


		Object.keys(options).forEach((key) => {
			if (options[key] === 'null') {
				options[key] = null;
			}

			if (options[key] === undefined) {
				delete options[key];
			}
		});


		Ember.set( options  , 'methods' , {
			reloadItems(){
				self._reloadItems();
			},
			destroy(){
				self._destroyMasonry();
			},
			layout(){
				self._layoutMasonry();
			},
			getItemElements(){
				const masonry = self.get('masonry');
				return masonry ? masonry.getItemElements() : [];
			},
			masonry(){
				self.didRender();
			}
		});

		Ember.set( options , 'getMasonry' , function(){
			const masonry = self.get('masonry');
			return masonry;
		});


		return options;
	},



	_destroyMasonry() {
		const masonry = this.get('masonry');
		if (masonry) {
			masonry.destroy();
		}
		this.set('masonry', undefined);
	},

	_reloadItems(){
		const masonry = this.get('masonry');
		if ( masonry ) {
			masonry.reloadItems();
		}
	},

	_layoutMasonry(){
		const masonry = this.get('masonry');
		if ( masonry ) {
			masonry.layout();
		}
	},

	didInsertElement(){

		let self = this,
		$ele = this.$(),
		width = $ele.width();
	
		setInterval( ()=>{
			if ( $ele.width() !== width ){
				width = $ele.width();

				Ember.run.debounce(self, self._layoutMasonry , 150);
			}
		} , 100 );
	}
});
