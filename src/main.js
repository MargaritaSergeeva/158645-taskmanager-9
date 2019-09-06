import constant from './constant.js';
import util from './util.js';
import {getTaskData, getFilterData} from './data.js';
import SiteMenu from './components/site-menu.js';
import Search from './components/search.js';
import Filter from './components/filter.js';
import Statistics from './components/statistics.js';
import {BoardController} from './controllers/board.js';
import {SearchController} from './controllers/search.js';

const TASK_COUNT = 20;

const mainElement = document.querySelector(`.main`);
const controlContainerElement = mainElement.querySelector(`.main__control`);
let taskMocks = new Array(TASK_COUNT).fill(``).map(getTaskData);
let openedTasks = taskMocks.filter(({isArchive}) => !isArchive);
const filerMock = getFilterData(taskMocks, openedTasks);
const siteMenu = new SiteMenu();
const search = new Search();
const filter = new Filter(filerMock);
const statistics = new Statistics();

const onDataChange = (newTaskMocks) => {
  taskMocks = newTaskMocks;
  openedTasks = taskMocks.filter(({isArchive}) => !isArchive);
};

const onSearchBackButtonClick = () => {
  statistics.getElement().classList.add(`visually-hidden`);
  searchController.hide();
  boardController.show(openedTasks, taskMocks);
};

util.render(controlContainerElement, siteMenu.getElement(), constant.Position.BEFOREEND);
util.render(mainElement, search.getElement(), constant.Position.BEFOREEND);
util.render(mainElement, filter.getElement(), constant.Position.BEFOREEND);
util.render(mainElement, statistics.getElement(), constant.Position.BEFOREEND);
statistics.getElement().classList.add(`visually-hidden`);

const boardController = new BoardController(mainElement, onDataChange);
const searchController = new SearchController(mainElement, search.getElement(), onSearchBackButtonClick);

boardController.show(openedTasks, taskMocks);

siteMenu.getElement().addEventListener(`change`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `INPUT`) {
    return;
  }

  const tasksId = `control__task`;
  const statisticId = `control__statistic`;
  const newTaskId = `control__new-task`;
  const searchInputElement = search.getElement().querySelector(`input`);

  switch (evt.target.id) {
    case tasksId:
      statistics.getElement().classList.add(`visually-hidden`);
      boardController.show(openedTasks, taskMocks);
      searchController.hide();
      searchInputElement.value = ``;
      break;
    case statisticId:
      boardController.hide();
      searchController.hide();
      statistics.getElement().classList.remove(`visually-hidden`);
      searchInputElement.value = ``;
      break;
    case newTaskId:
      if (!util.isElementContainsClass(statistics.getElement(), `visually-hidden`)) {
        statistics.getElement().classList.add(`visually-hidden`);
      }
      boardController.show(openedTasks, taskMocks);
      boardController.createTask();
      siteMenu.getElement().querySelector(`#${tasksId}`).checked = true;
      searchController.hide();
      searchInputElement.value = ``;
      break;
  }
});

search.getElement().addEventListener(`click`, () => {
  statistics.getElement().classList.add(`visually-hidden`);
  boardController.hide();
  searchController.show(taskMocks);
});
