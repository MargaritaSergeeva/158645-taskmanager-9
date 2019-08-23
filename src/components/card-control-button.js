import util from '../util.js';

export default class CardControlButton {
  constructor(array) {
    this._element = null;
    this._array = array;
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
    return `<button type="button" class="card__btn card__btn--${this._array[0]} ${this._array[1]}">
    ${this._array[0]}
    </button>`.trim();
  }
}
