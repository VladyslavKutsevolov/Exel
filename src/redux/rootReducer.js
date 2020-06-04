import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CURRENT_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE
} from './types';

const value = (state, payload, field) => {
  const val = state[field] || {};
  val[payload.id] = payload.value;
  return val;
};

export const rootReducer = (state, { type, payload }) => {
  if (type === TABLE_RESIZE) {
    const field = payload.type === 'col' ? 'colState' : 'rowState';
    return {
      ...state,
      [field]: value(state, payload, field)
    };
  }

  if (type === CHANGE_TEXT) {
    const field = 'cellState';
    return {
      ...state,
      currentText: payload.value,
      [field]: value(state, payload, field)
    };
  }

  if (type === CURRENT_STYLES) {
    return { ...state, currentStyles: payload };
  }

  if (type === APPLY_STYLE) {
    const field = 'styleState';
    const val = state[field] || {};
    payload.ids.forEach(id => {
      val[id] = { ...val[id], ...payload.value };
    });
    return {
      ...state,
      styleState: val,
      currentStyles: { ...state.currentStyles, ...payload.value }
    };
  }

  if (type === CHANGE_TITLE) {
    return { ...state, title: payload };
  }

  return JSON.parse(JSON.stringify(state));
};
