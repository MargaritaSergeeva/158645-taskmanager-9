import AbstractComponent from './abstract-component.js';

const controlMap = {
  'newTask': [`control__new-task`, `+ ADD NEW TASK`, `control__label--new-task`, false],
  'tasks': [`control__task`, `TASKS`, ``, true],
  'statistic': [`control__statistic`, `STATISTICS`, ``, false],
};

const controlType = [`newTask`, `tasks`, `statistic`];

const getControlRadioTemplate = (array) => (
  `<input
      type="radio"
      name="control"
      id="${array[0]}"
      class="control__input visually-hidden"
      ${array[3] ? ` checked` : ``}
    />
    <label for="${array[0]}" class="control__label ${array[2]}">
      ${array[1]}
    </label>`.trim()
);

export default class SiteMenu extends AbstractComponent {
  getTemplate() {
    return `<section class="control__btn-wrap">
      ${controlType.map((type) => getControlRadioTemplate(controlMap[type]).trim()).join(``)}
    </section>`.trim();
  }
}
