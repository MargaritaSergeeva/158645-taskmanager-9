const getSortingLinkTemplate = (text) => `<a href="#" class="board__filter">SORT BY ${text}</a>`;

export const getBoardSortingTemplate = () => (
  `<div class="board__filter-list">
    ${getSortingLinkTemplate(`DEFAULT`)}
    ${getSortingLinkTemplate(`DATE up`)}
    ${getSortingLinkTemplate(`DATE down`)}
  </div>`
);
