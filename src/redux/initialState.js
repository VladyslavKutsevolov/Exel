/* eslint-disable import/no-unresolved */
import { storage } from '@core/utils';
import { defaultStyles } from '@/const';

const defaultState = {
  rowState: {},
  colState: {},
  cellState: {},
  currentText: '',
  currentStyles: {}
};

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState;
