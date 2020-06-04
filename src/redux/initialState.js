/* eslint-disable import/no-unresolved */
import { storage } from '@core/utils';
import { defaultStyles, defaultTitle } from '@/const';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  cellState: {},
  styleState: {},
  currentText: '',
  currentStyles: defaultStyles
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState;
