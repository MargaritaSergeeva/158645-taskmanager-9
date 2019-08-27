import constant from './constant.js';

export default {
  getRandomBoolean() {
    return Boolean(Math.round(Math.random()));
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
};
