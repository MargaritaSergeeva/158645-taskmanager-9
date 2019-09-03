import moment from 'moment';
import AbstractComponent from './abstract-component.js';
import CardColorBar from './card-color-bar.js';

export default class Task extends AbstractComponent {
  constructor(tasks) {
    super();
    this._description = tasks.description;
    this._dueDate = tasks.dueDate;
    this._tags = tasks.tags;
    this._color = tasks.color;
    this._repeatingDays = tasks.repeatingDays;
    this._isArchive = tasks.isArchive;
    this._isFavorite = tasks.isFavorite;
  }

  getTemplate() {
    return `<article class="card card--${this._color} ${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `card--repeat` : ``}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
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
            <p class="card__text">${this._description}</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline
                ${this._dueDate ? `` : ` visually-hidden`}">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${moment(this._dueDate).format(`DD MMMM`)}</span>
                  </p>
                </div>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
                    <span class="card__hashtag-name">
                      #${tag}
                    </span>
                  </span>`
                  .trim())
                  .join(``)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`.trim();
  }
}
