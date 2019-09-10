import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import util from '../util.js';
import constant from '../constant.js';
import Statistics from '../components/statistics.js';
import moment from 'moment';

const DAYS_IN_WEEK = 7;
const DAY_IN_MS = 8.64e+7;


export class StatisticsController {
  constructor(container) {
    this._container = container;
    this._tasks = [];
    this._sortedTasks = [];
    this._statistics = new Statistics();
    this._statisticsElement = this._statistics.getElement();
    this._periodInputElement = this._statisticsElement.querySelector(`.statistic__period-input`);
    this._choosenDates = [];
    this._day = null;
    this._daysChart = null;
    this._tagsChart = null;
    this._colorsChart = null;

    this._init();
  }

  hide() {
    if (!util.isElementContainsClass(this._statisticsElement, `visually-hidden`)) {
      this._statisticsElement.classList.add(`visually-hidden`);
    }
  }

  show(tasks) {
    this._day = Date.now() + DAY_IN_MS;
    const lastWeekDays = new Array(DAYS_IN_WEEK).fill(``).map(() => {
      this._day -= DAY_IN_MS;
      return moment(this._day).format(`DD MMM`);
    });

    this._choosenDates = lastWeekDays.reverse();

    if (tasks !== this._tasks) {
      this._tasks = tasks;
      this._sortedTasks = tasks.sort((left, right) => left.dueDate - right.dueDate);
    }

    flatpickr(this._periodInputElement, {
      mode: `range`,
      altInput: true,
      altFormat: `d M`,
      dateFormat: `d M`,
      defaultDate: [`${this._choosenDates[0]}`, `${this._choosenDates[this._choosenDates.length - 1]}`],
      minDate: moment(this._sortedTasks[0].dueDate).format(`DD MMM`),
      maxDate: moment(this._sortedTasks[this._sortedTasks.length - 1].dueDate).format(`DD MMM`),
      onChange: (selectedDates, dateStr, fp) => {
        const dates = Array.prototype.map.call(fp.days.childNodes, (d) => d.dateObj);
        const startDate = dateStr.slice(0, 6);
        const endDate = dateStr.slice(10);
        const datesInFormat = dates.map((day) => moment(day).format(`DD MMM`));
        this._choosenDates = datesInFormat.slice(datesInFormat.findIndex((date) => date === startDate), datesInFormat.findIndex((date) => date === endDate) + 1);
        fp.set(`minDate`, moment(this._sortedTasks[0].dueDate).format(`DD MMM`));
        fp.set(`maxDate`, moment(this._sortedTasks[this._sortedTasks.length - 1].dueDate).format(`DD MMM`));
        fp.set(`defaultDate`, [`${this._choosenDates[0]}`, `${this._choosenDates[this._choosenDates.length - 1]}`]);
      },
    });

    this._createDataForChars(tasks, this._choosenDates);
    this._setCharts();

    this._statisticsElement.classList.remove(`visually-hidden`);
  }

  _init() {
    util.render(this._container, this._statisticsElement, constant.Position.BEFOREEND);
    this._statisticsElement.classList.add(`visually-hidden`);

    this._periodInputElement.addEventListener(`change`, (evt) => this._onPeriodInputChange(evt));
  }

  _onPeriodInputChange(evt) {
    evt.preventDefault();

    this._renserStatistics(this._sortedTasks, this._choosenDates);
  }

  _renserStatistics(tasks, days) {
    this._createDataForChars(tasks, days);
    this._daysChart.data.labels = days;
    this._daysChart.data.datasets[0].data = this._tasksCountsPerDay;
    this._tagsChart.data.labels = this._unicTags;
    this._tagsChart.data.datasets[0].data = this._tasksCountsPerTag;
    this._colorsChart.data.labels = this._unicColors;
    this._colorsChart.data.datasets[0].data = this._tasksCountsPerColor;
    this._daysChart.update();
    this._tagsChart.update();
    this._colorsChart.update();
  }

  _createDataForChars(tasks, days) {
    const tasksInChoosenDays = days.reduce((sumTasks, day) => {
      sumTasks = sumTasks.concat(tasks.filter(({dueDate}) => moment(dueDate).format(`DD MMM`).toString() === day));
      return sumTasks;
    },
    []);

    this._tasksCountsPerDay = days.map((day) => tasks.filter(({dueDate}) => moment(dueDate).format(`DD MMM`) === day).length);

    this._unicTags = Array.from(new Set(tasksInChoosenDays
      .reduce((sumTags, {tags}) => {
        return sumTags.concat(Array.from(tags));
      }, [])));

    this._tasksCountsPerTag = this._unicTags.map((unicTag) => tasksInChoosenDays.filter(({tags}) => Array.from(tags).find((tag) => tag === unicTag)).length);

    this._unicColors = Array.from(new Set(tasksInChoosenDays
      .map(({color}) => color
      )));

    this._tasksCountsPerColor = this._unicColors.map((unicColor) => tasksInChoosenDays.filter(({color}) => color === unicColor).length);
  }

  _setCharts() {
    const daysCtx = document.querySelector(`.statistic__days`);
    const tagsCtx = document.querySelector(`.statistic__tags`);
    const colorsCtx = document.querySelector(`.statistic__colors`);

    this._daysChart = new Chart(daysCtx, {
      plugins: [ChartDataLabels],
      type: `line`,
      data: {
        labels: this._choosenDates,
        datasets: [{
          data: this._tasksCountsPerDay,
          backgroundColor: `transparent`,
          borderColor: `#000000`,
          borderWidth: 1,
          lineTension: 0,
          pointRadius: 8,
          pointHoverRadius: 8,
          pointBackgroundColor: `#000000`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 8
            },
            color: `#ffffff`
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              fontStyle: `bold`,
              fontColor: `#000000`
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        layout: {
          padding: {
            top: 10
          }
        },
        tooltips: {
          enabled: false
        }
      }
    });

    this._tagsChart = new Chart(tagsCtx, {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: {
        labels: this._unicTags,
        datasets: [{
          data: this._tasksCountsPerTag,
          backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: false
          }
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];
              const total = allData.reduce((acc, it) => acc + parseFloat(it));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);
              return `${tooltipData} TASKS — ${tooltipPercentage}%`;
            }
          },
          displayColors: false,
          backgroundColor: `#ffffff`,
          bodyFontColor: `#000000`,
          borderColor: `#000000`,
          borderWidth: 1,
          cornerRadius: 0,
          xPadding: 15,
          yPadding: 15
        },
        title: {
          display: true,
          text: `DONE BY: TAGS`,
          fontSize: 16,
          fontColor: `#000000`
        },
        legend: {
          position: `left`,
          labels: {
            boxWidth: 15,
            padding: 25,
            fontStyle: 500,
            fontColor: `#000000`,
            fontSize: 13
          }
        }
      }
    });

    this._colorsChart = new Chart(colorsCtx, {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: {
        labels: this._unicColors,
        datasets: [{
          data: this._tasksCountsPerColor,
          backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: false
          }
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];
              const total = allData.reduce((acc, it) => acc + parseFloat(it));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);
              return `${tooltipData} TASKS — ${tooltipPercentage}%`;
            }
          },
          displayColors: false,
          backgroundColor: `#ffffff`,
          bodyFontColor: `#000000`,
          borderColor: `#000000`,
          borderWidth: 1,
          cornerRadius: 0,
          xPadding: 15,
          yPadding: 15
        },
        title: {
          display: true,
          text: `DONE BY: COLORS`,
          fontSize: 16,
          fontColor: `#000000`
        },
        legend: {
          position: `left`,
          labels: {
            boxWidth: 15,
            padding: 25,
            fontStyle: 500,
            fontColor: `#000000`,
            fontSize: 13
          }
        }
      }
    });
  }
}
