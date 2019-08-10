import {cardControlButtonMap} from './card-control-button.js';
import {getCardControlButtonTemplate} from './card-control-button.js';
import {getCardColorBarTemplate} from './card-color-bar.js';

const cardDatesButtonMap = {
  'date': [`date-deadline`, `date`],
  'repeat': [`repeat`, `repeat`],
};

const getEditCardDatesButtonTemplate = (array) => (
  `<button class="card__${array[0]}-toggle" type="button">
    ${array[1]}: <span class="card__${array[1]}-status">no</span>
  </button>`
);

const getEditCardRepeateInputTemplate = (day, isChecked = false) => (
  `<input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${day}-1"
    name="repeat"
    value="${day}"
    ${isChecked ? ` checked` : ``}
  />
  <label class="card__repeat-day" for="repeat-${day}-1">
    ${day}
  </label>`
);

const getEditCardColorInputTemplate = (color, isChecked = false) => (
  `<input
    type="radio"
    id="color-${color}-1"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${isChecked ? ` checked` : ``}
  />
  <label
    for="color-${color}-1"
    class="card__color card__color--${color}"
    >${color}
  </label>`
);

const getStatusButtonTemplate = (type, text) => `<button class="card__${text}" type="${type}">${text}</button>`;

export const getEditCardTemplate = () => (
  `<article class="card card--edit card--black">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          ${getCardControlButtonTemplate(cardControlButtonMap.archive)}
          ${getCardControlButtonTemplate(cardControlButtonMap.favorites)}
        </div>
        ${getCardColorBarTemplate()}
        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >This is example of new task, you can add picture, set date and time, add tags.</textarea>
          </label>
        </div>
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              ${getEditCardDatesButtonTemplate(cardDatesButtonMap.date)}
              <fieldset class="card__date-deadline" disabled>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="23 September"
                    name="date"
                  />
                </label>
              </fieldset>
              ${getEditCardDatesButtonTemplate(cardDatesButtonMap.repeat)}
              <fieldset class="card__repeat-days" disabled>
                <div class="card__repeat-days-inner">
                  ${getEditCardRepeateInputTemplate(`mo`)}
                  ${getEditCardRepeateInputTemplate(`tu`, true)}
                  ${getEditCardRepeateInputTemplate(`we`)}
                  ${getEditCardRepeateInputTemplate(`th`)}
                  ${getEditCardRepeateInputTemplate(`fr`, true)}
                  ${getEditCardRepeateInputTemplate(`sa`)}
                  ${getEditCardRepeateInputTemplate(`su`, true)}
                </div>
              </fieldset>
            </div>
            <div class="card__hashtag">
              <div class="card__hashtag-list"></div>
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
              ${getEditCardColorInputTemplate(`black`, true)}
              ${getEditCardColorInputTemplate(`yellow`)}
              ${getEditCardColorInputTemplate(`blue`)}
              ${getEditCardColorInputTemplate(`green`)}
              ${getEditCardColorInputTemplate(`pink`)}
            </div>
          </div>
        </div>
        <div class="card__status-btns">
          ${getStatusButtonTemplate(`submit`, `save`)}
          ${getStatusButtonTemplate(`button`, `delete`)}
        </div>
      </div>
    </form>
  </article>`
);
