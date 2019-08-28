import util from './util.js';

const DESCRIPTION_ARRAY_LENGTH = 3;
const COLOR_ARRAY_LENGTH = 5;
const DAYS_COUNT = 7;
const HOURS_COUNT = 24;
const MIN_COUNT = 60;
const SEC_COUNT = 60;
const MS_COUNT = 1000;
const MS = 1;
const MIN_TAGS_COUNT = 0;
const MAX_TAGS_COUNT = 3;

const getWeekInMs = () => Math.floor(Math.random() * DAYS_COUNT) * HOURS_COUNT * MIN_COUNT * SEC_COUNT * MS_COUNT;

export const getTaskData = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * DESCRIPTION_ARRAY_LENGTH)],
  dueDate: Date.now() + MS + getWeekInMs() - getWeekInMs(),
  repeatingDays: {
    'Mo': util.getRandomBoolean(),
    'Tu': false,
    'We': util.getRandomBoolean(),
    'Th': false,
    'Fr': util.getRandomBoolean(),
    'Sa': false,
    'Su': false,
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `science`,
    `study`
  ]
  .sort(() => Math.random() - 0.5)
  .splice(MIN_TAGS_COUNT, Math.round(Math.random() * MAX_TAGS_COUNT))
  ),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * COLOR_ARRAY_LENGTH)],
  isFavorite: util.getRandomBoolean(),
  isArchive: util.getRandomBoolean(),
});

export const getFilterData = (tasks, openedTasks) => ([
  {
    title: `all`,
    get count() {
      return openedTasks.length;
    },
  },
  {
    title: `overdue`,
    get count() {
      return openedTasks.filter(({dueDate}) => dueDate < Date.now()).length;
    },
  },
  {
    title: `today`,
    get count() {
      return openedTasks.filter(({dueDate}) => (new Date(dueDate)).getDate() === (new Date()).getDate()).length;
    },
  },
  {
    title: `favorites`,
    get count() {
      return openedTasks.filter(({isFavorite}) => isFavorite).length;
    },
  },
  {
    title: `repeating`,
    get count() {
      return openedTasks
        .filter(({repeatingDays}) => {
          return Object.keys(repeatingDays).some((day) => repeatingDays[day]);
        })
        .length;
    },
  },
  {
    title: `tags`,
    get count() {
      return openedTasks.filter(({tags}) => tags.size > 0).length;
    },
  },
  {
    title: `archive`,
    get count() {
      return tasks.filter(({isArchive}) => isArchive).length;
    },
  },
]);
