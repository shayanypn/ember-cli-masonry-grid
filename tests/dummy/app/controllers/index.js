import Ember from 'ember';


export default Ember.Controller.extend({
	options: Ember.Object.create({
		// gutter: 0
		// gutter: 30,
		// originLeft: false,
		// stagger: 50,
		itemSelector: '.grid-item',
		columnWidth: 250,
		// percentPosition: true,
		// columnWidth: '.grid-sizer',
	}),
	items: Ember.computed.alias('model'),

	actions: {
		onReloadItems(){
			this.get('options.methods').reloadItems();
		},
		onLayout(){
			this.get('options.methods').layout();
		},
		onMasonry(){
			this.get('options.methods').masonry();
		}
	}
});