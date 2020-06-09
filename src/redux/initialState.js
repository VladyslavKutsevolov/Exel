/* eslint-disable import/no-unresolved */
import { defaultStyles, defaultTitle } from '@/const';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  cellState: {},
  styleState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openData: new Date().toJSON()
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});

// eslint-disable-next-line no-confusing-arrow
export const normalizeInitialState = state =>
  state ? normalize(state) : defaultState;
