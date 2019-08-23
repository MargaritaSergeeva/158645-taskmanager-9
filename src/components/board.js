import util from '../util.js';
import BoardSorting from './board-sorting.js';
import LoadMoreButton from './load-more-button.js';


export default class Board {
  constructor(isButton) {
    this._element = null;
    this._isButton = isButton;
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
    return `<section class="board container">
      ${new BoardSorting().getTemplate()}
      <div class="board__tasks">
      </div>
    ${this._isButton ? `${new LoadMoreButton().getTemplate()}` : ``}
    </section>`
    .trim();
  }
}
