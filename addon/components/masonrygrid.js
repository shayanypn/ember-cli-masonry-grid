/* global Masonry */
import Component from '@glimmer/component';
import { action, computed } from '@ember/object';

const MASONRY_OPTION_KEYS = [
  'containerStyle',
  'hiddenStyle',
  'fitWidth',
  'isInitLayout',
  'isResizeBound',
  'itemSelector',
  'stamp',
  'transitionDuration',
  'stagger',
  'visibleStyle',
  'horizontalOrder',
  //
  'percentPosition',
  'columnWidth',
  'gutter',
  'originLeft',
  'originTop',
];

export default class MasonryGridComponent extends Component {

  @action
  render(ele) {
  	const options = {
  	  itemSelector: '.masonry-widget'
  	};
  	MASONRY_OPTION_KEYS.map(key => {
  	  if (this.args[key]) {
  	  	let value = this.args[key];

  	  	if (value === 'true' || value === 'false') {
  	  		value = value === 'true';
  	  	} else if (Number(value) !== NaN) {
  	  		value = Number(value);
  	  	}

        options[key] = value;
  	  }
  	});

  	console.log('options', options);
    const msnry = new Masonry(ele, options);
  }
}