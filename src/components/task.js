
import constant from '../constant.js';
import AbstractComponent from './abstract-component.js';
import CardControlButton from './card-control-button.js';
import CardColorBar from './card-color-bar.js';

export default class Task extends AbstractComponent {
  constructor({description, dueDate, tags, color, repeatingDays}) {
    super();
    this._description = description;
    this._dueDate = new Date(dueDate);
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
  }

  getTemplate() {
    return `<article class="card card--${this._color} ${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `card--repeat` : ``}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${new CardControlButton(constant.CARD_CONTROL_BUTTON_MAP.edit).getTemplate()}
            ${new CardControlButton(constant.CARD_CONTROL_BUTTON_MAP.archive).getTemplate()}
            ${new CardControlButton(constant.CARD_CONTROL_BUTTON_MAP.favorites).getTemplate()}
          </div>
          ${new CardColorBar().getTemplate()}
          <div class="card__textarea-wrap">
            <p class="card__text">${this._description}</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${new Date(this._dueDate).toDateString()}</span>
                    <span class="card__time">11:15 PM</span>
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
