import moment from 'moment';
import AbstractComponent from './abstract-component.js';

export default class StatisticsPeriod extends AbstractComponent {
  constructor(unicDays, fulfilledTasksCount) {
    super();
    this._unicDays = unicDays;
    this._fulfilledTasksCount = fulfilledTasksCount;
  }

  getTemplate() {
    return `<div class="statistic__period">
      <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

      <div class="statistic-input-wrap">
        <input
          class="statistic__period-input"
          type="text"
          placeholder="01 Feb - 08 Feb"
        />
      </div>

      <p class="statistic__period-result">
        In total for the specified period
        <span class="statistic__task-found">0</span> tasks were fulfilled.
      </p>
    </div>`.trim();
  }
}
