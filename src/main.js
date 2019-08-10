import {getMenuTemplate} from './components/site-menu.js';
import {getSearchTemplate} from './components/search.js';
import {getFilterTemplate} from './components/filter.js';
import {getBoardContainerTemplate} from './components/board.js';
import {getCardTemplate} from './components/card.js';
import {getEditCardTemplate} from './components/edit-card.js';
import {getBoardSortingTemplate} from './components/board-sorting.js';
import {getLoadButtonTemplate} from './components/load-more-button.js';

const mainElement = document.querySelector(`.main`);
const controlContainerElement = mainElement.querySelector(`.main__control`);

const renderComponent = (element, container, place) => container.insertAdjacentHTML(place, element);

renderComponent(getMenuTemplate(), controlContainerElement, `beforeend`);
renderComponent(getSearchTemplate(), mainElement, `beforeend`);
renderComponent(getFilterTemplate(), mainElement, `beforeend`);
renderComponent(getBoardContainerTemplate(), mainElement, `beforeend`);

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = mainElement.querySelector(`.board__tasks`);

renderComponent(getBoardSortingTemplate(), boardElement, `afterbegin`);
renderComponent(getEditCardTemplate(), taskListElement, `beforeend`);

new Array(3).fill(``).forEach(() => renderComponent(getCardTemplate(), taskListElement, `beforeend`));

renderComponent(getLoadButtonTemplate(), boardElement, `beforeend`);
