import constant from './constant.js';
import util from './util.js';
import {getTaskData, getFilterData} from './data.js';
import SiteMenu from './components/site-menu.js';
import Search from './components/search.js';
import Filter from './components/filter.js';
import {BoardController} from './controllers/board.js';

const TASK_COUNT = 20;

const mainElement = document.querySelector(`.main`);
const controlContainerElement = mainElement.querySelector(`.main__control`);
const tasks = new Array(TASK_COUNT).fill(``).map(getTaskData);
const openedTasks = tasks.filter(({isArchive}) => !isArchive);
const boardController = new BoardController(mainElement, tasks, openedTasks);


util.render(controlContainerElement, new SiteMenu().getElement(), constant.Position.BEFOREEND);
util.render(mainElement, new Search().getElement(), constant.Position.BEFOREEND);
util.render(mainElement, new Filter(getFilterData(tasks, openedTasks)).getElement(), constant.Position.BEFOREEND);
boardController.init();
