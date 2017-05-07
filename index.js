/* eslint-env node */
'use strict';

module.exports = {
	name: 'ember-cli-masonry-grid',
	isDevelopingAddon: function() {
		return true;
	},
	included: function(app) {
		this._super.included.apply(this, arguments);

		app.import(app.bowerDirectory + '/masonry/dist/masonry.pkgd.min.js');

		app.import(app.bowerDirectory + '/imagesloaded/imagesloaded.pkgd.min.js');
	}
};
