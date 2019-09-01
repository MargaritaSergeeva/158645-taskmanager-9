import constant from '../constant.js';
import util from '../util.js';
import Board from '../components/board.js';
import BoardSorting from '../components/board-sorting.js';
import TaskList from '../components/task-list.js';
import {TaskController} from '../controllers/task.js';
import LoadMoreButton from '../components/load-more-button.js';
import MessageNoTasks from '../components/message-no-tasks.js';

const TASKS_IN_PART = 8;

export class BoardController {
  constructor(container, tasks, openedTasks) {
    this._container = container;
    this._tasks = tasks;
    this._openedTasks = openedTasks;
    this._board = new Board();
    this._boardSorting = new BoardSorting();
    this._taskList = new TaskList();
    this._loadMoreButton = new LoadMoreButton();
    this._messageNoTasks = new MessageNoTasks();
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._subscriptions = [];
    this._renderedTasks = 0;
    this._sortedTasks = this._openedTasks;
  }

  init() {
    util.render(this._container, this._board.getElement(), constant.Position.BEFOREEND);

    if (this._isOpenedTasks()) {
      util.render(this._board.getElement(), this._boardSorting.getElement(), constant.Position.BEFOREEND);
      this._boardSorting.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

      util.render(this._board.getElement(), this._taskList.getElement(), constant.Position.BEFOREEND);

      this._openedTasks
      .slice(0, this._renderedTasks + TASKS_IN_PART)
      .forEach((taskItem) => this._renderTask(taskItem));

      util.render(this._board.getElement(), this._loadMoreButton.getElement(), constant.Position.BEFOREEND);
      this._loadMoreButton.getElement().addEventListener(`click`, (evt) => this._onLoadMoreElementClick(evt));

      if (!this._isButton()) {
        this._loadMoreButton.getElement().classList.add(`visually-hidden`);
      }

    } else {
      util.render(this._board.getElement(), this._messageNoTasks.getElement(), constant.Position.BEFOREEND);
    }

    this._renderedTasks += TASKS_IN_PART;
  }

  _isOpenedTasks() {
    return this._openedTasks.length > 0;
  }

  _isButton() {
    return this._openedTasks.length - this._renderedTasks > TASKS_IN_PART;
  }

  _renderTasks(tasks) {
    this._taskList.getElement().innerHTML = ``;
    tasks
    .slice(0, this._renderedTasks)
    .forEach((task) => this._renderTask(task));
  }

  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._sortedTasks[this._sortedTasks.findIndex((it) => it === oldData)] = newData;

    this._renderTasks(this._sortedTasks);
  }

  _onLoadMoreElementClick(evt) {
    evt.preventDefault();
    this._taskList.getElement().innerHTML = ``;

    this._sortedTasks
      .slice(0, this._renderedTasks + TASKS_IN_PART)
      .forEach((taskItem) => this._renderTask(taskItem));

    if (!this._isButton()) {
      this._loadMoreButton.getElement().classList.add(`visually-hidden`);
    }

    this._renderedTasks += TASKS_IN_PART;
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;
    this._renderedTasks = this._renderedTasks > TASKS_IN_PART ? TASKS_IN_PART : this._renderedTasks;
    if (this._sortedTasks.length > TASKS_IN_PART) {
      this._loadMoreButton.getElement().classList.remove(`visually-hidden`);
    }


    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._openedTasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks
        .slice(0, TASKS_IN_PART)
        .forEach((task) => this._renderTask(task));
        this._sortedTasks = sortedByDateUpTasks;
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._openedTasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks
        .slice(0, TASKS_IN_PART)
        .forEach((task) => this._renderTask(task));
        this._sortedTasks = sortedByDateDownTasks;
        break;
      case `default`:
        this._openedTasks
        .slice(0, TASKS_IN_PART)
        .forEach((task) => this._renderTask(task));
        this._sortedTasks = this._openedTasks;
        break;
    }
  }
}
