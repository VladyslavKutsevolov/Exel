/* eslint-disable import/no-unresolved */
import ExcelComponent from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeTable } from './table.resize';
import { shouldResize } from './table.helper.functions';
import { TableSelection } from './TableSelection';

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

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.findOne('[data-id="0:0"]');
    console.log('Table -> init -> cell', $cell);
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeTable(event, this.$root);
    }
  }
}
