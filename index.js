'use strict';

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);
    this.import('node_modules/masonry-layout/dist/masonry.pkgd.min.js');
  },
};
