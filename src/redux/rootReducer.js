import { TABLE_RESIZE, CHANGE_TEXT, CURRENT_STYLES } from './types';

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
      currentText: payload.text,
      [field]: value(state, payload, field)
    };
  }

  if (type === CURRENT_STYLES) {
    console.log(state);
    return { ...state, currentStyles: payload };
  }

  return JSON.parse(JSON.stringify(state));
};
