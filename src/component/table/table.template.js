const CODE = {
  A: 65,
  Z: 90
};

const createCells = (_, index) =>
  ` <div class="cell" data-col="${index}"  contenteditable></div>  `;

const createCols = (col, index) => `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>`;

const createRows = (content, index) => {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';

  return `
    <div class="row" data-type="resizable">
      <div class="row-info"">
        ${index || ''}
        ${resize}
      </div>
      <div class="row-data" data-type="resizable">${content}</div>
    </div>
  `;
};

const toChar = (_, i) => String.fromCharCode(CODE.A + i);

export const createTable = (rowCount = 15) => {
  const colsCount = CODE.Z - CODE.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCols)
    .join('');

  rows.push(createRows(cols, null));
  // prettier-ignore
  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCells)
      .join('');

    rows.push(createRows(cells, i + 1));
  }
  return rows.join('');
};
