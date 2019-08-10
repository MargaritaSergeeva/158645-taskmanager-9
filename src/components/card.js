import {cardControlButtonMap} from './card-control-button.js';
import {getCardControlButtonTemplate} from './card-control-button.js';
import {getCardColorBarTemplate} from './card-color-bar.js';

const getCardHashtagNameTemplate = (text) => (
  `<span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${text}
    </span>
  </span>`
);


export const getCardTemplate = () => (
  `<article class="card card--black">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${getCardControlButtonTemplate(cardControlButtonMap.edit)}
            ${getCardControlButtonTemplate(cardControlButtonMap.archive)}
            ${getCardControlButtonTemplate(cardControlButtonMap.favorites)}
          </div>
          ${getCardColorBarTemplate()}
          <div class="card__textarea-wrap">
            <p class="card__text">Example default task with default color.</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">23 September</span>
                    <span class="card__time">11:15 PM</span>
                  </p>
                </div>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${getCardHashtagNameTemplate(`todo`)}
                  ${getCardHashtagNameTemplate(`personal`)}
                  ${getCardHashtagNameTemplate(`important`)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
);
