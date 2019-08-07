'use strict';
const CARD_COUNT = 3;

const mainElement = document.querySelector(`.main`);
const controlContainerElement = mainElement.querySelector(`.main__control`);


const controlMap = {
  'newTask': [`control__new-task`, `+ ADD NEW TASK`, `control__label--new-task`],
  'task': [`control__task`, `TASKS`, ``],
  'statistic': [`control__statistic`, `STATISTICS`, ``],
};

const filterMap = {
  'all': [`filter__all`, `All`, `13`],
  'overdue': [`filter__overdue`, `Overdue`, `0`],
  'today': [`filter__today`, `Today`, `0`],
  'favorites': [`filter__favorites`, `Favorites`, `1`],
  'repeating': [`filter__repeating`, `Repeating`, `1`],
  'tags': [`filter__tags`, `Tags`, `1`],
  'archive': [`filter__archive`, `Archive`, `115`],
};

const cardControlButtonMap = {
  'edit': [`edit`, ``],
  'archive': [`archive`, ``],
  'favorites': [`favorites`, `card__btn--disabled`],
};

const cardDatesButtonMap = {
  'date': [`date-deadline`, `date`],
  'repeat': [`repeat`, `repeat`],
};


const getControlRadioComponent = (array, isChecked = false) => (
  `<input
      type="radio"
      name="control"
      id="${array[0]}"
      class="control__input visually-hidden"
      ${isChecked ? ` checked` : ``}
    />
    <label for="${array[0]}" class="control__label ${array[2]}">
      ${array[1]}
    </label>`
);

const getMenuComponent = () => (
  `<section class="control__btn-wrap">
    ${getControlRadioComponent(controlMap.newTask)}
    ${getControlRadioComponent(controlMap.task, true)}
    ${getControlRadioComponent(controlMap.statistic)}
  </section>`
);

const getSearchComponent = () => (
  `<section class="main__search search container">
    <input
      type="text"
      id="search__input"
      class="search__input"
      placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
    />
    <label class="visually-hidden" for="search__input">Search</label>
  </section>`
);

const getFilterRadioComponent = (array, isChecked = false, isDisabled = false) => (
  `<input
      type="radio"
      id="${array[0]}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? ` checked` : ``}
      ${isDisabled ? ` disabled` : ``}
    />
    <label for="${array[0]}" class="filter__label">
      ${array[1]} <span class="${array[0]}-count">${array[2]}</span>
    </label>`
);

const getFilterComponent = () => (
  `<section class="main__filter filter container">
    ${getFilterRadioComponent(filterMap.all, true, false)}
    ${getFilterRadioComponent(filterMap.overdue, false, true)}
    ${getFilterRadioComponent(filterMap.today, false, true)}
    ${getFilterRadioComponent(filterMap.favorites)}
    ${getFilterRadioComponent(filterMap.repeating)}
    ${getFilterRadioComponent(filterMap.tags)}
    ${getFilterRadioComponent(filterMap.archive)}
  </section>`
);

const getCardControlButtonComponent = (array) => (
  `<button type="button" class="card__btn card__btn--${array[0]} ${array[1]}">
    ${array[0]}
  </button>`
);

const getCardColorBarComponent = () => (
  `<div class="card__color-bar">
    <svg class="card__color-bar-wave" width="100%" height="10">
      <use xlink:href="#wave"></use>
    </svg>
  </div>`
);

const getCardHashtagNameComponent = (text) => (
  `<span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${text}
    </span>
  </span>`
);

const getCardComponent = () => (
  `<article class="card card--black">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${getCardControlButtonComponent(cardControlButtonMap.edit)}
            ${getCardControlButtonComponent(cardControlButtonMap.archive)}
            ${getCardControlButtonComponent(cardControlButtonMap.favorites)}
          </div>
          ${getCardColorBarComponent()}
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
                  ${getCardHashtagNameComponent(`todo`)}
                  ${getCardHashtagNameComponent(`personal`)}
                  ${getCardHashtagNameComponent(`important`)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
);

const getEditCardDatesButtonComponent = (array) => (
  `<button class="card__${array[0]}-toggle" type="button">
    ${array[1]}: <span class="card__${array[1]}-status">no</span>
  </button>`
);

const getEditCardRepeateInputComponent = (day, isChecked = false) => (
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

const getEditCardColorInputComponent = (color, isChecked = false) => (
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

const getStatusButtonComponent = (type, text) => `<button class="card__${text}" type="${type}">${text}</button>`;

const getEditCardComponent = () => (
  `<article class="card card--edit card--black">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          ${getCardControlButtonComponent(cardControlButtonMap.archive)}
          ${getCardControlButtonComponent(cardControlButtonMap.favorites)}
        </div>
        ${getCardColorBarComponent()}
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
              ${getEditCardDatesButtonComponent(cardDatesButtonMap.date)}
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
              ${getEditCardDatesButtonComponent(cardDatesButtonMap.repeat)}
              <fieldset class="card__repeat-days" disabled>
                <div class="card__repeat-days-inner">
                  ${getEditCardRepeateInputComponent(`mo`)}
                  ${getEditCardRepeateInputComponent(`tu`, true)}
                  ${getEditCardRepeateInputComponent(`we`)}
                  ${getEditCardRepeateInputComponent(`th`)}
                  ${getEditCardRepeateInputComponent(`fr`, true)}
                  ${getEditCardRepeateInputComponent(`sa`)}
                  ${getEditCardRepeateInputComponent(`su`, true)}
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
              ${getEditCardColorInputComponent(`black`, true)}
              ${getEditCardColorInputComponent(`yellow`)}
              ${getEditCardColorInputComponent(`blue`)}
              ${getEditCardColorInputComponent(`green`)}
              ${getEditCardColorInputComponent(`pink`)}
            </div>
          </div>
        </div>
        <div class="card__status-btns">
          ${getStatusButtonComponent(`submit`, `save`)}
          ${getStatusButtonComponent(`button`, `delete`)}
        </div>
      </div>
    </form>
  </article>`
);

const getBoardFilterComponent = (text) => `<a href="#" class="board__filter">SORT BY ${text}</a>`;

const getBoardFilterListComponent = () => (
  `<div class="board__filter-list">
    ${getBoardFilterComponent(`DEFAULT`)}
    ${getBoardFilterComponent(`DATE up`)}
    ${getBoardFilterComponent(`DATE down`)}
  </div>`
);

const getLoadButtonComponent = () => `<button class="load-more" type="button">load more</button>`;

const addRepeateComponent = (cb, repeate = 1) => {
  let componentsBlock = cb();

  for (let i = 1; i < repeate; i++) {
    componentsBlock += cb();
  }

  return componentsBlock;
};

const getBoardContainerComponent = () => (
  `<section class="board container">
    ${getBoardFilterListComponent()}
    <div class="board__tasks">
      ${getEditCardComponent()}
      ${addRepeateComponent(getCardComponent, CARD_COUNT)}
    </div>
    ${getLoadButtonComponent()}
  </section>`
);

const addComponentToHtml = (element, container) => container.insertAdjacentHTML(`beforeend`, element);


addComponentToHtml(getMenuComponent(), controlContainerElement);
addComponentToHtml(getSearchComponent(), mainElement);
addComponentToHtml(getFilterComponent(), mainElement);
addComponentToHtml(getBoardContainerComponent(), mainElement);
