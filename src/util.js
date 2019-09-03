import constant from './constant.js';

const SINGLE_DIGIT_LIMIT = 10;

export default {
  getRandomBoolean() {
    return Boolean(Math.round(Math.random()));
  },

  getNumberWithZero(number) {
    return number < SINGLE_DIGIT_LIMIT ? `0` + number : number;
  },

  createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  },

  render(container, element, place) {
    switch (place) {
      case constant.Position.AFTERBEGIN:
        container.prepend(element);
        break;
      case constant.Position.BEFOREEND:
        container.append(element);
        break;
    }
  },

  unrender(element) {
    if (element) {
      element.remove();
    }
  },

  isElementDisabled(element) {
    return element.hasAttribute(`disabled`);
  },

  isElementContainsClass(element, className) {
    return element.classList.contains(className);
  },
};
