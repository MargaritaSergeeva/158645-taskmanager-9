import AbstractComponent from './abstract-component.js';

export default class CardControlButton extends AbstractComponent {
  constructor(array) {
    super();
    this._array = array;
  }

  getTemplate() {
    return `<button type="button" class="card__btn card__btn--${this._array[0]} ${this._array[1]}">
    ${this._array[0]}
    </button>`.trim();
  }
}
