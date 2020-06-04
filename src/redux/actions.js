import { TABLE_RESIZE, CHANGE_TEXT, CURRENT_STYLES } from './types';

export const tableResizeAction = data => ({
  type: TABLE_RESIZE,
  payload: data
});

export const changeText = data => ({
  type: CHANGE_TEXT,
  payload: data
});

export const currentStyles = data => ({
  type: CURRENT_STYLES,
  payload: data
});
