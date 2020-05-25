/* eslint-disable import/no-unresolved */
import ExcelComponent from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeTable } from './table.resize';
import { shouldResize } from './table.helper.functions';

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
    if (shouldResize(event)) {
      resizeTable(event, this.$root);
    }
  }
}
