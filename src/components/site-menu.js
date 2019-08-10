const controlMap = {
  'newTask': [`control__new-task`, `+ ADD NEW TASK`, `control__label--new-task`],
  'task': [`control__task`, `TASKS`, ``],
  'statistic': [`control__statistic`, `STATISTICS`, ``],
};

const getControlRadioTemplate = (array, isChecked = false) => (
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

export const getMenuTemplate = () => (
  `<section class="control__btn-wrap">
    ${getControlRadioTemplate(controlMap.newTask)}
    ${getControlRadioTemplate(controlMap.task, true)}
    ${getControlRadioTemplate(controlMap.statistic)}
  </section>`
);
