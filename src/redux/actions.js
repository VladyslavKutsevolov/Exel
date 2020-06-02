import { TABLE_RESIZE, CHANGE_TEXT } from './types';

export const tableResizeAction = payload => ({
  type: TABLE_RESIZE,
  payload
});

export const changeText = data => ({
  type: CHANGE_TEXT,
  payload: data
});
