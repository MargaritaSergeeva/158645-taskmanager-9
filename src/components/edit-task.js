import moment from 'moment';
import keyBoard from '../keyboard.js';
import constant from '../constant.js';
import AbstractComponent from './abstract-component.js';
import CardColorBar from './card-color-bar.js';
import util from '../util.js';

const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

export default class EditTask extends AbstractComponent {
  constructor(tasks) {
    super();
    this._description = tasks.description;
    this._dueDate = tasks.dueDate;
    this._tags = tasks.tags;
    this._color = tasks.color;
    this._repeatingDays = tasks.repeatingDays;
    this._isArchive = tasks.isArchive;
    this._isFavorite = tasks.isFavorite;
    this._changeColor = this._color;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return `<article class="card card--edit card--${this._color} ${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--archive
            ${this._isArchive ? `` : ` card__btn--disabled`}">
              archive
            </button>
            <button type="button" class="card__btn card__btn--favorites
            ${this._isFavorite ? `` : ` card__btn--disabled`}">
              favorites
            </button>
          </div>
          ${new CardColorBar().getTemplate()}
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${this._description}</textarea>
            </label>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">
                  ${this._dueDate ? ` yes` : `no`}</span>
                </button>
                <fieldset class="card__date-deadline"
                  ${this._dueDate ? `` : `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                      datetime="${moment(this._dueDate).format()}"
                      value="${this._dueDate ? `${moment(this._dueDate).format(`DD MMMM HH:mm A`)}` : ``}"
                    />
                  </label>
                </fieldset>
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">
                  ${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? ` yes` : `no`}</span>
                </button>
                <fieldset class="card__repeat-days"
                  ${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `` : `disabled`}>
                  <div class="card__repeat-days-inner">
                    ${Object.keys(this._repeatingDays).map((day) => (`<input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-${day}-1"
                      name="repeat"
                      value="${day}"
                      ${this._repeatingDays[day] ? ` checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-${day}-1">
                      ${day}
                    </label>`)
                    .trim())
                    .join(``)}
                  </div>
                </fieldset>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${Array.from(this._tags).map((tag) => (`<span class="card__hashtag-inner">
                      <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input">
                      <p class="card__hashtag-name">#${tag}</p>
                      <button type="button" class="card__hashtag-delete">delete</button>
                    </span>`)
                  .trim())
                  .join(``)}
                </div>
                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${COLORS.map((it) => `<input
                  type="radio"
                  id="color-${it}-1"
                  class="card__color-input card__color-input--${it} visually-hidden"
                  name="color"
                  value="${it}"
                  ${it === this._color ? `checked` : ``}
                />
                <label
                  for="color-${it}-1"
                  class="card__color card__color--${it}">${it}</label>`
                .trim())
                .join(``)}
              </div>
            </div>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.card__hashtag-input`).addEventListener(`keydown`, (evt) => {
      if (keyBoard.isEnterPressed(evt)) {
        evt.preventDefault();
        this.getElement().querySelector(`.card__hashtag-list`).insertAdjacentHTML(constant.Position.BEFOREEND, `<span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="${evt.target.value}"
              class="card__hashtag-hidden-input"
            />
            <p class="card__hashtag-name">
              #${evt.target.value}
            </p>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>`);
        evt.target.value = ``;
      }
    });

    this.getElement().querySelectorAll(`.card__hashtag-delete`).forEach((it) => it.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      util.unrender(evt.target.parentNode);
    }));

    this.getElement().querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.getElement().querySelector(`.card__date`).value = ``;
      const dateDeadlineElement = this.getElement().querySelector(`.card__date-deadline`);
      if (util.isElementDisabled(dateDeadlineElement)) {
        this.getElement().querySelector(`.card__date-deadline`).disabled = false;
        this.getElement().querySelector(`.card__date-status`).textContent = `yes`;
      } else {
        this.getElement().querySelector(`.card__date-deadline`).disabled = true;
        this.getElement().querySelector(`.card__date-status`).textContent = `no`;
      }
    });

    this.getElement().querySelector(`.card__repeat-toggle`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      Array.from(this.getElement().querySelectorAll(`.card__repeat-day-input`)).forEach((it) => {
        it.checked = false;
      });

      const repeatDaysElement = this.getElement().querySelector(`.card__repeat-days`);
      if (util.isElementDisabled(repeatDaysElement)) {
        this.getElement().querySelector(`.card__repeat-days`).disabled = false;
        this.getElement().querySelector(`.card__repeat-status`).textContent = `yes`;
        this.getElement().classList.add(`card--repeat`);
      } else {
        this.getElement().querySelector(`.card__repeat-days`).disabled = true;
        this.getElement().querySelector(`.card__repeat-status`).textContent = `no`;
        this.getElement().classList.remove(`card--repeat`);
      }
    });

    this.getElement().querySelector(`.card__colors-wrap`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (util.isElementContainsClass(evt.target, `card__color`)) {
        this.getElement().classList.remove(`card--${this._changeColor}`);
        this.getElement().classList.add(`card--${evt.target.textContent}`);

        this._changeColor = evt.target.textContent;
        Array.from(this.getElement().querySelectorAll(`card__color-input`)).forEach((it) => {
          it.checked = false;
        });
        this.getElement().querySelector(`.card__color-input--${this._changeColor}`).checked = true;
      }
    });

    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.getElement().querySelector(`.card__btn--archive`).classList.toggle(`card__btn--disabled`);
    });

    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.getElement().querySelector(`.card__btn--favorites`).classList.toggle(`card__btn--disabled`);
    });
  }
}
