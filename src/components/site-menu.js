const controlMap = {
  'newTask': [`control__new-task`, `+ ADD NEW TASK`, `control__label--new-task`],
  'task': [`control__task`, `TASKS`, ``],
  'statistic': [`control__statistic`, `STATISTICS`, ``],
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

export const getMenuComponent = () => (
  `<section class="control__btn-wrap">
    ${getControlRadioComponent(controlMap.newTask)}
    ${getControlRadioComponent(controlMap.task, true)}
    ${getControlRadioComponent(controlMap.statistic)}
  </section>`
);
