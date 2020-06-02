import { TABLE_RESIZE, CHANGE_TEXT } from './types';

export const rootReducer = (state, { type, payload }) => {
  if (type === TABLE_RESIZE) {
    const field = payload.type === 'col' ? 'colState' : 'rowState';
    const prevState = state[field] || {};
    prevState[payload.id] = payload.value;
    return {
      ...state,
      [field]: prevState
    };
  }

  if (type === CHANGE_TEXT) {
    const prevState = state.cellState || {};
    prevState[payload.id] = payload.text;
    return {
      ...state,
      currentText: payload.text,
      cellState: prevState
    };
  }

  return state;
};
