import constant from '../constant.js';
import util from '../util.js';
import Board from '../components/board.js';
import BoardSorting from '../components/board-sorting.js';
import TaskList from '../components/task-list.js';
import {TaskListController} from './task-list.js';
import LoadMoreButton from '../components/load-more-button.js';
import MessageNoTasks from '../components/message-no-tasks.js';

export class BoardController {
  constructor(container, onDataChange) {
    this._container = container;
    this._taskMocks = [];
    this._tasks = [];
    this._sortedTasks = this._tasks;
    this._renderedTasks = 0;
    this._onDataChangeMain = onDataChange;
    this._board = new Board();
    this._boardElement = this._board.getElement();
    this._boardSorting = new BoardSorting();
    this._taskList = new TaskList();
    this._loadMoreButton = new LoadMoreButton();
    this._messageNoTasks = new MessageNoTasks();
    this._taskListController = new TaskListController(this._taskList.getElement(), this._onDataChange.bind(this));
    this._onDataChange = this._onDataChange.bind(this);

    this._init();
  }

  hide() {
    this._boardElement.classList.add(`visually-hidden`);
  }

  show(tasks, taskMocks) {
    if (tasks !== this._tasks) {
      this._setTasks(tasks);
    }

    if (taskMocks !== this._taskMocks) {
      this._taskMocks = taskMocks;
    }

    this._boardElement.classList.remove(`visually-hidden`);
  }

  createTask() {
    if (util.isElementContainsClass(this._boardElement, `visually-hidden`)) {
      this._boardElement.classList.remove(`visually-hidden`);
    }

    this._taskListController.createTask();
  }

  _init() {
    util.render(this._container, this._boardElement, constant.Position.BEFOREEND);
  }

  _renderBoard() {
    if (this._tasks.length > 0) {
      this._renderedTasks = 0;

      util.render(this._boardElement, this._boardSorting.getElement(), constant.Position.BEFOREEND);
      this._boardSorting.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

      util.render(this._boardElement, this._taskList.getElement(), constant.Position.BEFOREEND);

      this._taskListController.renderTasks(this._tasks, this._sortedTasks, constant.TASKS_IN_PART);

      util.render(this._boardElement, this._loadMoreButton.getElement(), constant.Position.BEFOREEND);
      this._loadMoreButton.getElement().addEventListener(`click`, (evt) => this._onLoadMoreElementClick(evt));

      if (!this._isButton()) {
        this._loadMoreButton.getElement().classList.add(`visually-hidden`);
      }

      this._renderedTasks = constant.TASKS_IN_PART;
    } else {
      util.render(this._boardElement, this._messageNoTasks.getElement(), constant.Position.BEFOREEND);
    }
  }

  _isOpenedTasks() {
    return this._tasks.length > 0;
  }

  _isButton() {
    return this._tasks.length - this._renderedTasks > constant.TASKS_IN_PART;
  }

  _setTasks(tasks) {
    this._tasks = tasks;
    this._sortedTasks = this._tasks;

    this._renderBoard();
  }

  _onDataChange(tasks, sortedTasks) {
    this._tasks = tasks;
    this._sortedTasks = sortedTasks;
    this._taskMocks = [...this._taskMocks.filter(({isArchive}) => isArchive), ...tasks];

    this._onDataChangeMain(this._taskMocks);

    this._renderBoard();
  }

  _onLoadMoreElementClick(evt) {
    evt.preventDefault();

    this._taskListController.renderTasks(this._tasks, this._sortedTasks, this._renderedTasks + constant.TASKS_IN_PART);
    this._renderedTasks += constant.TASKS_IN_PART;

    if (!this._isButton()) {
      this._loadMoreButton.getElement().classList.add(`visually-hidden`);
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;
    this._renderedTasks = constant.TASKS_IN_PART;
    if (this._sortedTasks.length > this._renderedTasks) {
      this._loadMoreButton.getElement().classList.remove(`visually-hidden`);
    }


    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._sortedTasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        this._sortedTasks = sortedByDateUpTasks;
        this._taskListController.renderTasks(this._tasks, this._sortedTasks, this._renderedTasks);
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._sortedTasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        this._sortedTasks = sortedByDateDownTasks;
        this._taskListController.renderTasks(this._tasks, this._sortedTasks, this._renderedTasks);
        break;
      case `default`:
        this._taskListController.renderTasks(this._tasks, this._sortedTasks, this._renderedTasks);
        this._sortedTasks = this._tasks;
        break;
    }
  }
}
