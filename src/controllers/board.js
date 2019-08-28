import constant from '../constant.js';
import util from '../util.js';
import keyBoard from '../keyboard.js';
import Board from '../components/board.js';
import BoardSorting from '../components/board-sorting.js';
import TaskList from '../components/task-list.js';
import Task from '../components/task.js';
import EditTask from '../components/edit-task.js';
import LoadMoreButton from '../components/load-more-button.js';
import MessageNoTasks from '../components/message-no-tasks.js';

export class BoardController {
  constructor(container, tasks, openedTasks) {
    this._container = container;
    this._tasks = tasks;
    this._openedTasks = openedTasks;
    this._sortedTasks = openedTasks;
    this._board = new Board();
    this._boardSorting = new BoardSorting();
    this._taskList = new TaskList();
    this._loadMoreButton = new LoadMoreButton();
    this._messageNoTasks = new MessageNoTasks();
    this._renderedTasks = 0;
    this._TASKS_IN_PART = 8;
  }

  init() {
    const isOpenedTasks = () => this._openedTasks.length > 0;
    util.render(this._container, this._board.getElement(), constant.Position.BEFOREEND);

    if (isOpenedTasks()) {
      util.render(this._board.getElement(), this._boardSorting.getElement(), constant.Position.BEFOREEND);
      this._boardSorting.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

      util.render(this._board.getElement(), this._taskList.getElement(), constant.Position.BEFOREEND);

      this._openedTasks
      .slice(0, this._renderedTasks + this._TASKS_IN_PART)
      .forEach((taskItem) => this._renderTask(taskItem));

      util.render(this._board.getElement(), this._loadMoreButton.getElement(), constant.Position.BEFOREEND);
      this._loadMoreButton.getElement().addEventListener(`click`, (evt) => this._onLoadMoreElementClick(evt));

      if (!this._isButton()) {
        this._loadMoreButton.getElement().classList.add(`visually-hidden`);
      }

    } else {
      util.render(this._board.getElement(), this._messageNoTasks.getElement(), constant.Position.BEFOREEND);
    }

    this._renderedTasks += this._TASKS_IN_PART;
  }

  _isButton() {
    return this._openedTasks.length - this._renderedTasks > this._TASKS_IN_PART;
  }

  _renderTask(taskItem) {
    const task = new Task(taskItem);
    const taskEdit = new EditTask(taskItem);

    const onEscKeyDown = (evt) => {
      if (keyBoard.isEscPressed(evt)) {
        this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskEdit.getElement(), task.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement()
      .querySelector(`form`)
      .addEventListener(`submit`, () => {
        this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    util.render(this._taskList.getElement(), task.getElement(), constant.Position.BEFOREEND);
  }

  _onLoadMoreElementClick(evt) {
    evt.preventDefault();
    this._taskList.getElement().innerHTML = ``;

    this._sortedTasks
      .slice(0, this._renderedTasks + this._TASKS_IN_PART)
      .forEach((taskItem) => this._renderTask(taskItem));

    if (!this._isButton()) {
      this._loadMoreButton.getElement().classList.add(`visually-hidden`);
    }

    this._renderedTasks += this._TASKS_IN_PART;
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;
    this._loadMoreButton.getElement().classList.remove(`visually-hidden`);
    this._renderedTasks = this._TASKS_IN_PART;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._openedTasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks
        .slice(0, this._TASKS_IN_PART)
        .forEach((task) => this._renderTask(task));
        this._sortedTasks = sortedByDateUpTasks;
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._openedTasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks
        .slice(0, this._TASKS_IN_PART)
        .forEach((task) => this._renderTask(task));
        this._sortedTasks = sortedByDateDownTasks;
        break;
      case `default`:
        this._openedTasks
        .slice(0, this._TASKS_IN_PART)
        .forEach((task) => this._renderTask(task));
        this._sortedTasks = this._openedTasks;
        break;
    }
  }
}
