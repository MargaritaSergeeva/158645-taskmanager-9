const filterMap = {
  'all': [`filter__all`, `All`, `13`],
  'overdue': [`filter__overdue`, `Overdue`, `0`],
  'today': [`filter__today`, `Today`, `0`],
  'favorites': [`filter__favorites`, `Favorites`, `1`],
  'repeating': [`filter__repeating`, `Repeating`, `1`],
  'tags': [`filter__tags`, `Tags`, `1`],
  'archive': [`filter__archive`, `Archive`, `115`],
};

const getFilterRadioTemplate = (array, isChecked = false, isDisabled = false) => (
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

export const getFilterTemplate = () => (
  `<section class="main__filter filter container">
    ${getFilterRadioTemplate(filterMap.all, true, false)}
    ${getFilterRadioTemplate(filterMap.overdue, false, true)}
    ${getFilterRadioTemplate(filterMap.today, false, true)}
    ${getFilterRadioTemplate(filterMap.favorites)}
    ${getFilterRadioTemplate(filterMap.repeating)}
    ${getFilterRadioTemplate(filterMap.tags)}
    ${getFilterRadioTemplate(filterMap.archive)}
  </section>`
);
