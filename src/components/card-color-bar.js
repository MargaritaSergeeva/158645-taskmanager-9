import AbstractComponent from './abstract-component.js';

export default class CardColorBar extends AbstractComponent {
  getTemplate() {
    return `<div class="card__color-bar">
    <svg class="card__color-bar-wave" width="100%" height="10">
      <use xlink:href="#wave"></use>
    </svg>
  </div>`.trim();
  }
}
