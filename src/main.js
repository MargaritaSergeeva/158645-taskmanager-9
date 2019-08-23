import constant from './constant.js';
import util from './util.js';
import SiteMenu from './components/site-menu.js';
import Search from './components/search.js';
import Filter from './components/filter.js';
import Board from './components/board.js';
import Task from './components/task.js';
import EditTask from './components/edit-task.js';
import {getTaskData, getFilterData} from './data.js';

const TASK_COUNT = 25;
const TASKS_IN_PART = 8;

const mainElement = document.querySelector(`.main`);
const controlContainerElement = mainElement.querySelector(`.main__control`);
const tasks = new Array(TASK_COUNT).fill(``).map(getTaskData);
let renderedTasks = 0;

const onLoadMoreElementClick = (evt) => {
  evt.preventDefault();
  renderBoardComponent(tasks);
};

const renderTask = (taskItem, tasksContainer) => {
  const task = new Task(taskItem);
  const taskEdit = new EditTask(taskItem);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`form`)
    .addEventListener(`submit`, () => {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  util.render(tasksContainer, task.getElement(), constant.Position.BEFOREEND);
};

const renderBoardComponent = (tasksArr) => {
  const boardElement = mainElement.querySelector(`.board`);


  const isButton = () => tasksArr.length - renderedTasks > TASKS_IN_PART;

  if (boardElement) {
    mainElement.removeChild(boardElement);
  }

  util.render(mainElement, new Board(isButton()).getElement(), constant.Position.BEFOREEND);

  const boardTasksElement = mainElement.querySelector(`.board__tasks`);
  tasksArr
  .slice(0, renderedTasks + TASKS_IN_PART)
  .forEach((taskItem) => renderTask(taskItem, boardTasksElement));

  const loadMoreElement = mainElement.querySelector(`.load-more`);
  if (loadMoreElement) {
    loadMoreElement.addEventListener(`click`, onLoadMoreElementClick);
  }

  renderedTasks += TASKS_IN_PART;
};

util.render(controlContainerElement, new SiteMenu().getElement(), constant.Position.BEFOREEND);
util.render(mainElement, new Search().getElement(), constant.Position.BEFOREEND);
util.render(mainElement, new Filter(getFilterData(tasks)).getElement(), constant.Position.BEFOREEND);
renderBoardComponent(tasks);
