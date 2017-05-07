import Ember from 'ember';
import layout from '../templates/components/masonry-widget';

export default Ember.Component.extend({
	layout,
	classNameBindings: ['itemClass'],
	attributeBindings: ['masonryItemStyle:style' , 'masonryItemId:id'],

	masonryItemStyle: Ember.String.htmlSafe('position: absolute'),

	itemClass: Ember.computed('item.masonry.classname', function() {
		let _classname = '';
		if ( this.get('item.masonry.classname') ) {
			_classname += this.get('grid.itemClass');
			_classname += this.get('item.masonry.classname');
		}else{
			_classname += this.get('grid.itemClass');
		}

		this.get('grid').observesLayout();

		return _classname.replace( /\./g , ' ' );
	}),

	masonryItemId: Ember.computed('item.masonry.elementId', function(){
		if ( this.get('item.masonry.elementId') ) {
			return this.get('item.masonry.elementId').replace('#','');
		}else{
			this.get('grid').incrementProperty('itemCount');
			return `masonry-item-${this.grid.itemCount}`;
		}
	}),

	// isStamped: function () {
	// 	let stamp = this.get('item.masonry.stamp'),
	// 		$grid = this.get('grid.masonry');
	// 	if ( stamp === true ) {
	// 		$grid.stamp(this.getElement() );
	// 		$grid.layout();
	// 	}else if( stamp === false ){
	// 		$grid.unstamp( this.getElement() );
	// 		$grid.layout();
	// 	}	
	// }.observes('item.masonry.stamp').on('init'),


	getElement(){
		return document.getElementById( this.get('masonryItemId') );
	}
});
