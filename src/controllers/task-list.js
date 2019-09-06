import constant from '../constant.js';
import {TaskController, Mode as TaskControllerMode} from './task.js';

export class TaskListController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChangeMain = onDataChange;

    this._creatingTask = null;
    this._subscriptions = [];
    this._tasks = [];
    this._sortedTasks = this._tasks;
    this._renderedTasks = 0;

    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onNewTaskClose = this._onNewTaskClose.bind(this);
  }

  renderTasks(tasks, sortedTasks, renderedTasks) {
    this._tasks = tasks;
    this._sortedTasks = sortedTasks;
    this._container.innerHTML = ``;
    this._subscriptions = [];
    if (renderedTasks) {
      this._renderedTasks = renderedTasks;
    }

    this._sortedTasks
    .slice(0, this._renderedTasks)
    .forEach((task) => this._renderTask(task));
  }

  createTask() {
    if (this._creatingTask) {
      return;
    }

    const defaultTask = {
      description: ``,
      dueDate: Date.now(),
      tags: new Set(),
      color: [],
      repeatingDays: {
        'Mo': false,
        'Tu': false,
        'We': false,
        'Th': false,
        'Fr': false,
        'Sa': false,
        'Su': false,
      },
      isFavorite: false,
      isArchive: false,
    };

    if (this._renderedTasks > constant.TASKS_IN_PART - 1) {
      const newRenderedTasks = this._renderedTasks - 1;
      this.renderTasks(this._tasks, this._sortedTasks, newRenderedTasks);
    }

    this._creatingTask = new TaskController(this._container, defaultTask, TaskControllerMode.ADDING, this._onChangeView, this._onNewTaskClose, (...args) => {
      this._creatingTask = null;
      this._onDataChange(...args);
    });
  }

  _renderTask(task) {
    const taskController = new TaskController(this._container, task, TaskControllerMode.DEFAULT, this._onChangeView, this._onNewTaskClose, this._onDataChange);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onNewTaskClose() {
    this._creatingTask = null;
    this._renderedTasks = constant.TASKS_IN_PART;
    this.renderTasks(this._tasks, this._sortedTasks);
  }

  _onDataChange(newData, oldData) {
    const indexsortedTasks = this._sortedTasks.findIndex((task) => task === oldData);
    const indexUnsortedtasks = this._tasks.findIndex((task) => task === oldData);

    if (newData === null) {
      this._sortedTasks = this._sortedTasks.slice(0, indexsortedTasks).concat(this._sortedTasks.slice(indexsortedTasks + 1));
      this._tasks = this._tasks.slice(0, indexUnsortedtasks).concat(this._tasks.slice(indexUnsortedtasks + 1));
    } else if (oldData === null) {
      this._sortedTasks = [newData, ...this._sortedTasks];
      this._tasks = [newData, ...this._tasks];
    } else {
      this._sortedTasks[indexsortedTasks] = newData;
      this._tasks[indexUnsortedtasks] = newData;
    }

    this.renderTasks(this._tasks, this._sortedTasks, this._renderedTasks);

    this._onDataChangeMain(this._tasks, this._sortedTasks);
  }
}


