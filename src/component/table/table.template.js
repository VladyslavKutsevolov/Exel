const CODE = {
  A: 65,
  Z: 90
};

const createCells = el => ` <div class="cell" contenteditable>${el}</div>  `;

const createCols = el => `<div class="column">${el}</div>`;

const createRows = (content, index = '') => `
        <div class="row"> 
            <div class="row-info">${index}</div>
            <div class="row-data">${content}</div>
        </div>
    `;

const toChar = (_, i) => String.fromCharCode(CODE.A + i);

export const createTable = (rowCount = 15) => {
  const colsCount = CODE.Z - CODE.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCols)
    .join('');

  // prettier-ignore
  const cells = new Array(colsCount)
    .fill('')
    .map(createCells)
    .join('');

  rows.push(createRows(cols));

  for (let i = 0; i < rowCount; i++) {
    rows.push(createRows(cells, i + 1));
  }
  return rows.join('');
};
