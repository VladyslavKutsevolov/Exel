/* eslint-disable import/prefer-default-export */
class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(context) {
    if (typeof context === 'string') {
      this.$el.innerHTML = context;
      return this;
    }
    return this.$el.innerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  addClass(className) {
    this.$el.classList.add(className);
  }

  removeClass(className) {
    this.$el.classList.remove(className);
  }

  on(eventType, cb) {
    this.$el.addEventListener(eventType, cb);
  }

  off(eventType, cb) {
    this.$el.removeEventListener(eventType, cb);
  }

  cssStyle(styles = {}) {
    return Object.assign(this.$el.style, styles);
  }

  findOne(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
}

export const $ = selector => new Dom(selector);

$.create = (tagName, className = '') => {
  const el = document.createElement(tagName);

  if (className) {
    el.classList.add(className);
  }

  return $(el);
};
