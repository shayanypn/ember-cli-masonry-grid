import Ember from 'ember';

const {
	Route
} = Ember;

export default Route.extend({

	items: Ember.A([]),

	model() {

		for (let i = 1; i <= 10; i++) {
			this.items.push(Object.create({
				name:  `Item ${i}`,
				masonry: Ember.Object.create({
				}),
				type1: true,
				type2: false
			}));
		}

		this.items.push({
			name:  `STAMP-ONE`,
			masonry: Ember.Object.create({
				classname: '.stamp',
				elementId: 'stamp1'
			}),
			isStamp: true
		});

		this.items.push({
			name:  `STAMP-TWO`,
			masonry: Ember.Object.create({
				classname: '.stamp-2',
				elementId: 'stamp2'
			}),
			isStamp: true
		});



		return this.items;
	},

	actions: {
		onAppend() {
			let self = this,
			i = this.get('items').length + 1;
			Ember.run(() => {
				self.items.pushObject(
					Object.create({
						name:  `Item ${i}`,
						masonry: Ember.Object.create({})
					})
				);
			});
		},
		onPrepend() {
			let self = this,
			i = this.get('items').length + 1;

			Ember.run(() => {
				self.items.insertAt(0,Object.create({
					name:  `Item ${i}`,
					masonry: Ember.Object.create({})
				}));
			});
		},
		onItemToggle( index ){
			let item = this.items.objectAt(index);
			if ( item ) {
				Ember.set(item, 'masonry.classname' , ( ( !item.masonry.classname || item.masonry.classname === '' ) ? '.grid-item-wide.grid-item'  : '' ) );
			}
		},
		onItemDelete(index){
			let item = this.items.objectAt(index);
			if ( item ) {
				this.items.removeObject( item );
			}
		},
		onDeleteLast(){
			this.items.removeAt( this.get('items').length - 1 );
		},
		onStamp(mode){
			if ( mode === 'one' ) {
				let item = this.items.findBy('name', 'STAMP-ONE');
				if ( item ) {
					Ember.set(item,'masonry.stamp', !item.masonry.stamp);
				}
			}else{
				let item = this.items.findBy('name', 'STAMP-TWO');
				if ( item ) {
					Ember.set(item,'masonry.stamp', !item.masonry.stamp);
				}
			}
		}
	}
});
