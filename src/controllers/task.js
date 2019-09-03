import cloneDeep from 'lodash/clonedeep';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import util from '../util.js';
import constant from '../constant.js';
import keyBoard from '../keyboard.js';
import Task from '../components/task.js';
import EditTask from '../components/edit-task.js';

export class TaskController {
  constructor(container, taskData, onDataChange, onChangeView) {
    this._container = container;
    this._taskData = taskData;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._taskView = new Task(taskData);
    this._taskEdit = new EditTask(taskData);
    this._isArchive = this._taskData.isArchive;
    this._isFavorite = this._taskData.isFavorite;
    this._newTaskData = cloneDeep(this._taskData);

    this.init();
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (keyBoard.isEscPressed(evt)) {
        this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    flatpickr(this._taskEdit.getElement().querySelector(`.card__date`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._taskData.dueDate,
    });

    this._taskView.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onChangeView();
        this._container.getElement().replaceChild(this._taskEdit.getElement(), this._taskView.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement()
      .querySelector(`form`)
      .addEventListener(`submit`, () => {
        const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));
        const week = {
          'Mo': false,
          'Tu': false,
          'We': false,
          'Th': false,
          'Fr': false,
          'Sa': false,
          'Su': false,
        };
        const entry = {
          description: formData.get(`text`),
          color: formData.get(`color`),
          tags: new Set(formData.getAll(`hashtag`)),
          dueDate: formData.get(`date`) ? new Date(formData.get(`date`)) : ``,
          repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
            acc[it] = true;
            return acc;
          }, week),
          isFavorite: this._isFavorite,
          isArchive: this._isArchive,
        };

        this._onDataChange(entry, this._taskData);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._taskView.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, () => this._onTaskViewArchiveBtnClick());
    this._taskView.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, () => this._onTaskViewFavoriteBtnClick());
    this._taskEdit.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, () => this._onTaskEditArchiveBtnClick());
    this._taskEdit.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, () => this._onTaskEditFavoriteBtnClick());

    util.render(this._container.getElement(), this._taskView.getElement(), constant.Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }

  _toggleIsArchive() {
    this._isArchive = this._taskData.isArchive ? false : true;
  }

  _toggleIsFavorite() {
    this._isFavorite = this._taskData.isFavorite ? false : true;
  }

  _onTaskViewArchiveBtnClick() {
    this._toggleIsArchive();
    this._newTaskData.isArchive = this._taskData.isArchive ? false : true;

    this._onDataChange(this._newTaskData, this._taskData);
  }

  _onTaskViewFavoriteBtnClick() {
    this._toggleIsFavorite();
    this._newTaskData.isFavorite = this._taskData.isFavorite ? false : true;

    this._onDataChange(this._newTaskData, this._taskData);
  }

  _onTaskEditArchiveBtnClick() {
    this._toggleIsArchive();
  }

  _onTaskEditFavoriteBtnClick() {
    this._toggleIsFavorite();
  }
}
