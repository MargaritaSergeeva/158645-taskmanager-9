import {getMenuTemplate} from './components/site-menu.js';
import {getSearchTemplate} from './components/search.js';
import {getFilterTemplate} from './components/filter.js';
import {getBoardContainerTemplate} from './components/board.js';
import {getTaskData} from './data.js';
import {getFilterData} from './data.js';

const TASK_COUNT = 25;
const TASKS_IN_PART = 8;

const mainElement = document.querySelector(`.main`);
const controlContainerElement = mainElement.querySelector(`.main__control`);
const tasks = new Array(TASK_COUNT).fill(``).map(getTaskData);
let renderedTasks = 0;

const renderComponent = (element, container, place) => container.insertAdjacentHTML(place, element);

const onLoadMoreElementClick = (evt) => {
  evt.preventDefault();
  renderBoardComponent(tasks);
};

const renderBoardComponent = (tasksArr) => {
  const boardElement = mainElement.querySelector(`.board`);

  const isButton = () => tasksArr.length - renderedTasks > TASKS_IN_PART;

  if (boardElement) {
    mainElement.removeChild(boardElement);
  }

  renderComponent(getBoardContainerTemplate(tasksArr.slice(0, renderedTasks + TASKS_IN_PART), isButton()), mainElement, `beforeend`);

  const loadMoreElement = mainElement.querySelector(`.load-more`);

  if (loadMoreElement) {
    loadMoreElement.addEventListener(`click`, onLoadMoreElementClick);
  }

  renderedTasks += TASKS_IN_PART;
};

renderComponent(getMenuTemplate(), controlContainerElement, `beforeend`);
renderComponent(getSearchTemplate(), mainElement, `beforeend`);
renderComponent(getFilterTemplate(getFilterData(tasks)), mainElement, `beforeend`);
renderBoardComponent(tasks);
