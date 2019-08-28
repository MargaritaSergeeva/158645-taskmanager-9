
import AbstractComponent from './abstract-component.js';

const SORTING_TYPES = [`default`, `date-up`, `date-down`];

const SORTING_TYPES_MAP = {
  'default': `DEFAULT`,
  'date-up': `DATE up`,
  'date-down': `DATE down`,
};

const getSortingLinkTemplate = (type, text) => `<a href="#" data-sort-type="${type}" class="board__filter">SORT BY ${text}</a>`.trim();

export default class BoardSorting extends AbstractComponent {
  getTemplate() {
    return `<div class="board__filter-list">
    ${SORTING_TYPES.map((type) => getSortingLinkTemplate(type, SORTING_TYPES_MAP[type]).trim()).join(``)}
    </div>`.trim();
  }
}
