import {getBoardSortingTemplate} from './board-sorting.js';
import {getEditCardTemplate} from './edit-card.js';
import {getCardTemplate} from './card.js';
import {getLoadButtonTemplate} from './load-more-button.js';

const renderTasks = ([firstTask, ...restTasks]) => (
  `${getEditCardTemplate(firstTask)}
  ${restTasks.map(getCardTemplate).join(``)}`
  .trim());

export const getBoardContainerTemplate = (tasks, isButton) => (
  `<section class="board container">
    ${getBoardSortingTemplate()}
    <div class="board__tasks">
      ${renderTasks(tasks)}
    </div>
  ${isButton ? `${getLoadButtonTemplate()}` : ``}
  </section>`
  .trim());
