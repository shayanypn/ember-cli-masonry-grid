/* global Masonry */
import Component from '@glimmer/component';

export default class MasonryGridComponent extends Component {
  focus(ele) {
    const msnry = new Masonry( ele, {
      itemSelector: '.masonry-item',
      columnWidth: 200
    });
  }
}