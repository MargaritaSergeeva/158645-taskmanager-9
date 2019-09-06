import constant from '../constant.js';
import util from '../util.js';
import SearchResult from '../components/search-result.js';
import SearchResultInfo from '../components/search-result-info.js';
import {TaskListController} from './task-list.js';

export class SearchController {
  constructor(container, searchElement, onBackButtonClick) {
    this._container = container;
    this._searchElement = searchElement;
    this._onBackButtonClick = onBackButtonClick;

    this._tasks = [];

    this._searchResult = new SearchResult();
    this._searchResultInfo = new SearchResultInfo({});
    this._taskListController = new TaskListController(
        this._searchResult.getElement().querySelector(`.result__cards`),
        this._onDataChange.bind(this)
    );

    this._init();
  }

  _init() {
    this.hide();

    util.render(this._container, this._searchResult.getElement(), constant.Position.BEFOREEND);
    util.render(this._searchResult.getElement().querySelector(`.result__group`), this._searchResultInfo.getElement(), constant.Position.AFTERBEGIN);

    const searchInputElement = this._searchElement.querySelector(`input`);

    this._searchResult.getElement().querySelector(`.result__back`)
      .addEventListener(`click`, () => {
        searchInputElement.value = ``;
        this._onBackButtonClick();
      });


    searchInputElement.addEventListener(`change`, (evt) => {
      const value = evt.target.value;
      const tasks = this._tasks.filter((task) => {
        return task.description.includes(value);
      });

      this._showSearchResult(value, tasks);
    });
  }

  hide() {
    this._searchResult.getElement().classList.add(`visually-hidden`);
  }

  show(tasks) {
    this._tasks = tasks;
    const allTitle = `all`;

    if (util.isElementContainsClass(this._searchResult.getElement(), `visually-hidden`)) {
      this._showSearchResult(allTitle, this._tasks);
      this._searchResult.getElement().classList.remove(`visually-hidden`);
    }
  }

  _showSearchResult(text, tasks) {
    if (this._searchResultInfo) {
      util.unrender(this._searchResultInfo.getElement());
      this._searchResultInfo.removeElement();
    }

    const searchResultGroupElement = this._searchResult.getElement().querySelector(`.result__group`);

    this._searchResultInfo = new SearchResultInfo(text, tasks.length);

    util.render(searchResultGroupElement, this._searchResultInfo.getElement(), constant.Position.AFTERBEGIN);

    this._taskListController.renderTasks(tasks, tasks, tasks.length);
  }

  _onDataChange(tasks) {
    this._tasks = tasks;
  }
}
