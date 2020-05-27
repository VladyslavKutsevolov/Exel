/* eslint-disable import/no-unresolved */
import { range } from '@core/utils';

export const shouldResize = event => event.target.dataset.resize;

export const isCell = event => event.target.dataset.type === 'cell';

export const selectGroupCells = ($target, selection, $root) => {
  const target = $target.id(true);
  const current = selection.curr.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  const ids = cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);
  const $cells = ids.map(id => $root.find(`[data-id="${id}"]`));

  selection.selectGroup($cells);
};
