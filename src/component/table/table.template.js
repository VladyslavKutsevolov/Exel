/* eslint-disable import/no-unresolved */
import { toInlineStyles } from '@core/utils';
import { defaultStyles } from '@/const';
import { parse } from '../../core/parse';

const CODE = {
  A: 65,
  Z: 90
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const getWidth = (state, index) => `${state[index] || DEFAULT_WIDTH}px`;
const getHeight = (state, index) => `${state[index] || DEFAULT_HEIGHT}px`;

const createCells = (state, row) => (_, col) => {
  const id = `${row}:${col}`;
  const cellContext = state.cellState[id];
  const styles = toInlineStyles({ ...defaultStyles, ...state.styleState[id] });

  return ` <div class="cell" 
      data-col="${col}" 
      data-id="${id}" 
      data-value="${cellContext || ''}"
      data-cell="cell" 
      contenteditable
      style="${styles}; width: ${getWidth(state.colState, col)}" 
      >
     ${parse(cellContext) || ''}</div>  `;
};

const createCols = ({ col, index, width }) => `
    <div class="column" 
      data-type="resizable" 
      data-col="${index}" 
      style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>`;

const createRows = (content, index, state) => {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  const height = getHeight(state, index);
  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
      <div class="row-info"">
        ${index || ''}
        ${resize}
      </div>
      <div class="row-data" data-type="resizable">${content}</div>
    </div>
  `;
};

const withWidthFrom = state => (col, index) => ({
  col,
  index,
  width: getWidth(state.colState, index)
});

const toChar = (_, i) => String.fromCharCode(CODE.A + i);

export const createTable = (rowCount = 15, state = {}) => {
  const colsCount = CODE.Z - CODE.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(createCols)
    .join('');

  rows.push(createRows(cols, null, {}));
  // prettier-ignore
  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCells(state, i))
      .join('');

    rows.push(createRows(cells, i + 1, state.rowState));
  }
  return rows.join('');
};
