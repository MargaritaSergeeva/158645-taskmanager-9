import AbstractComponent from './abstract-component.js';

export default class SearchResult extends AbstractComponent {
  getTemplate() {
    return `<section class="result container">
      <button class="result__back">back</button>
      <section class="result__group">
        <div class="result__cards"></div>
      </section>
    </section>`.trim();
  }
}
