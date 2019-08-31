import cloneDeep from 'lodash/clonedeep';
import util from '../util.js';
import constant from '../constant.js';
import keyBoard from '../keyboard.js';
import Task from '../components/task.js';
import EditTask from '../components/edit-task.js';

export class TaskController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._taskView = new Task(data);
    this._taskEdit = new EditTask(data);
    this._isArchive = this._data.isArchive;
    this._isFavorite = this._data.isFavorite;
    this._newData = cloneDeep(this._data);

    this.init();
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (keyBoard.isEscPressed(evt)) {
        this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

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
          dueDate: formData.get(`date`) ? new Date(this._taskEdit.getElement().querySelector(`.card__date`).getAttribute(`datetime`)) : ``,
          repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
            acc[it] = true;
            return acc;
          }, week),
          isFavorite: this._isFavorite,
          isArchive: this._isArchive,
        };

        this._onDataChange(entry, this._data);

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
    this._isArchive = this._data.isArchive ? false : true;
  }

  _toggleIsFavorite() {
    this._isFavorite = this._data.isFavorite ? false : true;
  }

  _onTaskViewArchiveBtnClick() {
    this._toggleIsArchive();
    this._newData.isArchive = this._data.isArchive ? false : true;

    this._onDataChange(this._newData, this._data);
  }

  _onTaskViewFavoriteBtnClick() {
    this._toggleIsFavorite();
    this._newData.isFavorite = this._data.isFavorite ? false : true;

    this._onDataChange(this._newData, this._data);
  }

  _onTaskEditArchiveBtnClick() {
    this._toggleIsArchive();
  }

  _onTaskEditFavoriteBtnClick() {
    this._toggleIsFavorite();
  }
}
