/* eslint-disable import/no-unresolved */
import ExcelComponent from '@core/ExcelComponent';
import { $ } from '@core/domHelper';
import { createTable } from './table.template';

export default class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    console.log(event.target);
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);
      const type = $resizer.data.resize;

      document.onmousemove = e => {
        if (type === 'col') {
          const delta = e.pageX - coords.right;
          const value = coords.width + delta;

          cells.forEach(el => (el.style.width = `${value}px`));
        } else {
          const delta = e.pageY - coords.bottom;
          const value = coords.height + delta;
          $parent.$el.style.height = `${value}px`;
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
