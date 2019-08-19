export const getFilterTemplate = (filters) => (
  `<section class="main__filter filter container">
    ${filters.map(({title, count}, index) => (
    `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${index === 0 ? ` checked` : ``}
      ${count === 0 ? ` disabled` : ``}
    />
    <label for="filter__${title}" class="filter__label">
      ${title[0].toUpperCase() + title.slice(1)} <span class="filter__${title}-count">${count}</span>
    </label>`)
    .trim())
    .join(``)}
  </section>`.trim()
);
