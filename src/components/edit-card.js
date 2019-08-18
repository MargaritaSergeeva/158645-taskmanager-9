import {cardControlButtonMap} from './card-control-button.js';
import {getCardControlButtonTemplate} from './card-control-button.js';
import {getCardColorBarTemplate} from './card-color-bar.js';

const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

export const getEditCardTemplate = ({description, dueDate, repeatingDays, tags, color}) => (
  `<article class="card card--edit card--${color} ${Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? `card--repeat` : ``}">
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
            >${description}</textarea>
          </label>
        </div>
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">
                ${dueDate ? ` yes` : `no`}</span>
              </button>
              <fieldset class="card__date-deadline"
                ${dueDate ? `` : `disabled`}>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="23 September"
                    name="date"
                    value="${dueDate ? `${new Date(dueDate).toDateString()}` : ``}"
                  />
                </label>
              </fieldset>
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">
                ${Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? ` yes` : `no`}</span>
              </button>
              <fieldset class="card__repeat-days"
                ${Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? `` : `disabled`}>
                <div class="card__repeat-days-inner">
                  ${Object.keys(repeatingDays).map((day) => (`<input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-${day}-1"
                    name="repeat"
                    value="${day}"
                    ${repeatingDays[day] ? ` checked` : ``}
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
                ${Array.from(tags).map((tag) => (`<span class="card__hashtag-inner">
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
                ${it === color ? `checked` : ``}
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
  </article>`.trim()
);
