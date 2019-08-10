export const cardControlButtonMap = {
  'edit': [`edit`, ``],
  'archive': [`archive`, ``],
  'favorites': [`favorites`, `card__btn--disabled`],
};

export const getCardControlButtonTemplate = (array) => (
  `<button type="button" class="card__btn card__btn--${array[0]} ${array[1]}">
    ${array[0]}
  </button>`
);
