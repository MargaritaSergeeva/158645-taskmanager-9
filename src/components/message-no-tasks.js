import util from '../util.js';

export default class MessageNoTasks {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = util.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<p class="board__no-tasks">
    Congratulations, all tasks were completed! To create a new click on
    «add new task» button.
  </p>`;
  }
}
