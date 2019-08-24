
import util from '../util.js';

const getSortingLinkTemplate = (text) => `<a href="#" class="board__filter">SORT BY ${text}</a>`.trim();

export default class BoardSorting {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = util.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<div class="board__filter-list">
      ${getSortingLinkTemplate(`DEFAULT`)}
      ${getSortingLinkTemplate(`DATE up`)}
      ${getSortingLinkTemplate(`DATE down`)}
    </div>`.trim();
  }
}
