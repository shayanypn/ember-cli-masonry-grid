/* eslint-env node */
module.exports = {
    description: ' An ember-cli addon that allows you to quickly, easily and powerfully build masonry grid views. ',

    normalizeEntityName: function() {},
    afterInstall: function() {
        return this.addBowerPackagesToProject([
          { name: 'masonry' },
          { name: 'imagesloaded' }
        ]);
    }

    // locals: function(options) {
    //   // Return custom template variables here.
    //   return {
    //     foo: options.entity.options.foo
    //   };
    // }

    // afterInstall: function(options) {
    //   // Perform extra work here.
    // }
};
