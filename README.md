# ember-cli-masonry-grid

This `ember-cli` addon imports the Masonry library and allows you to quickly, easily and powerfully  build masonry grid views.

## Installation
`ember install ember-cli-masonry-grid`

That's it! The Masonry library will automatically be imported in your app, and the `masonry-grid` component will be available to all of your templates.

## Basic Usage
The `masonry-grid` component accepts all of the options that `Masonry` exposes. The naming is the same, and any option not specified will use the `Masonry` default.


You have to choose the use the `masonry-grid`,

**Basic Setup**
Set up the following in our controller.
``` javascript
import Ember from 'ember';

export default Ember.Controller.extend({
	options: Ember.Object.create({
		itemSelector: '.grid-item',
		columnWidth: 250
	}),
	items: Ember.A([
		{ name: 'Item 1' },
		{ name: 'Item 2' },
		{ name: 'Item 3' }
	])
});
```

And in our template:

```hbs
{{#masonry-grid
	config=options  // set grid option
	widgets=items     // set grid items
 	as |item|}}
		{{item.name}}
{{/masonry-grid}}
```

Or you can pass masonry option within the template, like bellow

``` javascript
import Ember from 'ember';

export default Ember.Controller.extend({
	items: Ember.A([
		{ name: 'Item 1' },
		{ name: 'Item 2' },
		{ name: 'Item 3' }
	]);
});
```

And in our template:

```hbs
{{#masonry-grid
	itemSelector=".grid-item"
	columnWidth=250
	widgets=items
 	as |item|}}
		{{item.name}}
{{/masonry-grid}}
```

For a full list of options that are exposed, please see the [Masonry options](http://masonry.desandro.com/options.html).

**Advance Setup**


soon...


## Contributing
If you find an issue or missing functionality, please don't hesistate to open a pull request.

### Installation
* `git clone` this repository
* `npm install`
* `bower install`

### Running
* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests
* `npm test`

### Building
* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

