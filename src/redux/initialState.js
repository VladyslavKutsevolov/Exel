import { storage } from '../core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  cellState: {},
  currentText: ''
};

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState;
