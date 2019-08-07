'use strict';


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


const getControlRadioElement = (array, isChecked = false) => {
  return `
    <input
      type="radio"
      name="control"
      id="${array[0]}"
      class="control__input visually-hidden"
      ${isChecked ? ` checked` : ``}
    />
    <label for="${array[0]}" class="control__label ${array[2]}">
      ${array[1]}
    </label>
  `;
};

const getMenuElement = () => {
  return `
    <section class="control__btn-wrap">
      ${getControlRadioElement(controlMap.newTask)}
      ${getControlRadioElement(controlMap.task, true)}
      ${getControlRadioElement(controlMap.statistic)}
    </section>
  `;
};

const getSearchElement = () => {
  return `
    <section class="main__search search container">
      <input
        type="text"
        id="search__input"
        class="search__input"
        placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
      />
      <label class="visually-hidden" for="search__input">Search</label>
    </section>
  `;
};


const getFilterRadioElement = (array, isDisabled = false, isChecked = false) => {
  return `
    <input
      type="radio"
      id="${array[0]}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? ` checked` : ``}
      ${isDisabled ? ` disabled` : ``}
    />
    <label for="${array[0]}" class="filter__label">
      ${array[1]} <span class="${array[0]}-count">${array[2]}</span>
    </label>
  `;
};

const getFilterElement = () => {
  return `
    <section class="main__filter filter container">
      ${getFilterRadioElement(filterMap.all, false, true)}
      ${getFilterRadioElement(filterMap.overdue, true)}
      ${getFilterRadioElement(filterMap.today, true)}
      ${getFilterRadioElement(filterMap.favorites)}
      ${getFilterRadioElement(filterMap.repeating)}
      ${getFilterRadioElement(filterMap.tags)}
      ${getFilterRadioElement(filterMap.archive)}
    </section>
  `;
};

const getCardControlButtonElement = (array) => {
  return `
    <button type="button" class="card__btn card__btn--${array[0]} ${array[1]}">
      ${array[0]}
    </button>
  `;
};

const getCardControlElement = () => {
  return `
    <div class="card__control">
      ${getCardControlButtonElement(cardControlButtonMap.edit)}
      ${getCardControlButtonElement(cardControlButtonMap.archive)}
      ${getCardControlButtonElement(cardControlButtonMap.favorites)}
    </div>
  `;
};

const getCardColorBarElement = () => {
  return `
    <div class="card__color-bar">
      <svg class="card__color-bar-wave" width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
    </div>
  `;
};

const getCardTextareaElement = () => {
  return `
    <div class="card__textarea-wrap">
      <p class="card__text">Example default task with default color.</p>
    </div>
  `;
};

const getCardDatesElement = () => {
  return `
    <div class="card__dates">
      <div class="card__date-deadline">
        <p class="card__input-deadline-wrap">
          <span class="card__date">23 September</span>
          <span class="card__time">11:15 PM</span>
        </p>
      </div>
    </div>
  `;
};

const getCardHashtagNameElement = (text) => {
  return `
    <span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${text}
      </span>
    </span>
  `;
};

const getCardHashtagElement = () => {
  return `
    <div class="card__hashtag">
      <div class="card__hashtag-list">
        ${getCardHashtagNameElement(`todo`)}
        ${getCardHashtagNameElement(`personal`)}
        ${getCardHashtagNameElement(`important`)}
      </div>
    </div>
  `;
};

const getCardDetailsElement = () =>{
  return `
    <div class="card__details">
      ${getCardDatesElement()}
      ${getCardHashtagElement()}
    </div>
  `;
};

const getCardSettingsElement = () => {
  return `
    <div class="card__settings">
      ${getCardDetailsElement()}
    </div>
  `;
};

const getCardElement = () => {
  return `
    <article class="card card--black">
      <div class="card__form">
        <div class="card__inner">
          ${getCardControlElement()}
          ${getCardColorBarElement()}
          ${getCardTextareaElement()}
          ${getCardSettingsElement()}
        </div>
      </div>
    </article>
  `;
};

const getEditCardControlElement = () => {
  return `
    <div class="card__control">
      ${getCardControlButtonElement(cardControlButtonMap.archive)}
      ${getCardControlButtonElement(cardControlButtonMap.favorites)}
    </div>
  `;
};

const getEditCardTextareaElement = () => {
  return `
    <div class="card__textarea-wrap">
      <label>
        <textarea
          class="card__text"
          placeholder="Start typing your text here..."
          name="text"
        >This is example of new task, you can add picture, set date and time, add tags.</textarea>
      </label>
    </div>
  `;
};

const getEditCardDatesButtonElement = (array) => {
  return `
    <button class="card__${array[0]}-toggle" type="button">
      ${array[1]}: <span class="card__${array[1]}-status">no</span>
    </button>
  `;
};

const getEditCardRepeateInputElement = (day, isChecked = false) => {
  return `
    <input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}-1"
      name="repeat"
      value="${day}"
      ${isChecked ? ` checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${day}-1">
      ${day}
    </label>
  `;
};

const getEditCardDatesElement = () => {
  return `
    <div class="card__dates">
      ${getEditCardDatesButtonElement(cardDatesButtonMap.date)}
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
      ${getEditCardDatesButtonElement(cardDatesButtonMap.repeat)}
      <fieldset class="card__repeat-days" disabled>
        <div class="card__repeat-days-inner">
          ${getEditCardRepeateInputElement(`mo`)}
          ${getEditCardRepeateInputElement(`tu`, true)}
          ${getEditCardRepeateInputElement(`we`)}
          ${getEditCardRepeateInputElement(`th`)}
          ${getEditCardRepeateInputElement(`fr`, true)}
          ${getEditCardRepeateInputElement(`sa`)}
          ${getEditCardRepeateInputElement(`su`, true)}
        </div>
      </fieldset>
    </div>
  `;
};

const getEditCardHashtagElement = () => {
  return `
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
  `;
};


const getEditCardDetailsElement = () => {
  return `
    <div class="card__details">
      ${getEditCardDatesElement()}
      ${getEditCardHashtagElement()}
    </div>
  `;
};

const getEditCardColorInputElement = (color, isChecked = false) => {
  return `
    <input
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
    </label>
  `;
};

const getEditCardColorsElement = () => {
  return `
    <div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
        ${getEditCardColorInputElement(`black`, true)}
        ${getEditCardColorInputElement(`yellow`)}
        ${getEditCardColorInputElement(`blue`)}
        ${getEditCardColorInputElement(`green`)}
        ${getEditCardColorInputElement(`pink`)}
      </div>
    </div>
  `;
};

const getEditCardSettingsElement = () => {
  return `
    <div class="card__settings">
      ${getEditCardDetailsElement()}
      ${getEditCardColorsElement()}
    </div>
  `;
};

const getStatusButtonElement = (type, text) => {
  return `
    <button class="card__${text}" type="${type}">${text}</button>
  `;
};

const getEditCardStatusButtonsElement = () => {
  return `
    <div class="card__status-btns">
      ${getStatusButtonElement(`submit`, `save`)}
      ${getStatusButtonElement(`button`, `delete`)}
    </div>
  `;
};

const getEditCardElement = () => {
  return `
    <article class="card card--edit card--black">
      <form class="card__form" method="get">
        <div class="card__inner">
          ${getEditCardControlElement()}
          ${getCardColorBarElement()}
          ${getEditCardTextareaElement()}
          ${getEditCardSettingsElement()}
          ${getEditCardStatusButtonsElement()}
        </div>
      </form>
    </article>
  `;
};

const getBoardFilterElement = (text) => {
  return `
    <a href="#" class="board__filter">SORT BY ${text}</a>
  `;
};

const getBoardFilterListElement = () => {
  return `
    <div class="board__filter-list">
      ${getBoardFilterElement(`DEFAULT`)}
      ${getBoardFilterElement(`DATE up`)}
      ${getBoardFilterElement(`DATE down`)}
    </div>
  `;
};

const getBoardTasksElement = () => {
  return `
    <div class="board__tasks">
      ${getEditCardElement()}
      ${getCardElement()}
      ${getCardElement()}
      ${getCardElement()}
    </div>
  `;
};

const getLoadButtonElement = () => {
  return `
    <button class="load-more" type="button">load more</button>
  `;
};

const getBoardContainerElement = () => {
  return `
    <section class="board container">
      ${getBoardFilterListElement()}
      ${getBoardTasksElement()}
      ${getLoadButtonElement()}
    </section>
  `;
};

const addElementToHtml = (element, container) => {
  container.insertAdjacentHTML(`beforeend`, element);
};

addElementToHtml(getMenuElement(), controlContainerElement);
addElementToHtml(getSearchElement(), mainElement);
addElementToHtml(getFilterElement(), mainElement);
addElementToHtml(getBoardContainerElement(), mainElement);
