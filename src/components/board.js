import util from '../util.js';
import BoardSorting from './board-sorting.js';
import LoadMoreButton from './load-more-button.js';
import MessageNoTasks from './message-no-tasks.js';

const getBoardContentTemplate = (isButton, isOpenedTasks) => {
  let content = ``;

  if (isOpenedTasks) {
    content = `${new BoardSorting().getTemplate()}
    <div class="board__tasks">
    </div>
    ${isButton ? `${new LoadMoreButton().getTemplate()}` : ``}`;
  } else {
    content = `${new MessageNoTasks().getTemplate()}`;
  }

  return content;
};

export default class Board {
  constructor(isButton, isOpenedTasks) {
    this._element = null;
    this._isButton = isButton;
    this._isOpenedTasks = isOpenedTasks;
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
    return `<section class="board container">
    ${getBoardContentTemplate(this._isButton, this._isOpenedTasks)}
    </section>`
    .trim();
  }
}
