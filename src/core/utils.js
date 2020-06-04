/* eslint-disable import/prefer-default-export */
export const capitalize = string => {
  if (typeof string !== 'string') return '';

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const range = (start, end) => {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill('').map((_, i) => start + i);
};

// eslint-disable-next-line arrow-body-style
export const storage = (key, data) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
};

export const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
};

export const camelToDashCase = style =>
  style.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);

export const toInlineStyles = (styles = {}) =>
  Object.keys(styles)
    .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
    .join(';');

export const debounce = (fn, wait) => (...args) => {
  const timeout = setTimeout(() => {
    clearTimeout(timeout);
    fn(...args);
  }, wait);
};
