import {cardControlButtonMap} from './card-control-button.js';
import {getCardControlButtonTemplate} from './card-control-button.js';
import {getCardColorBarTemplate} from './card-color-bar.js';

export const getCardTemplate = ({description, dueDate, repeatingDays, tags, color}) => (
  `<article class="card card--${color} ${Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? `card--repeat` : ``}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${getCardControlButtonTemplate(cardControlButtonMap.edit)}
            ${getCardControlButtonTemplate(cardControlButtonMap.archive)}
            ${getCardControlButtonTemplate(cardControlButtonMap.favorites)}
          </div>
          ${getCardColorBarTemplate()}
          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${new Date(dueDate).toDateString()}</span>
                    <span class="card__time">11:15 PM</span>
                  </p>
                </div>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${Array.from(tags).map((tag) => `<span class="card__hashtag-inner">
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
    </article>`.trim()
);
