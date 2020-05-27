/* eslint-disable import/no-unresolved */
import ExcelComponent from '@core/ExcelComponent';
import { $ } from '@core/domHelper';
import { createTable } from './table.template';
import { resizeTable } from './table.resize';
import {
  shouldResize,
  isCell,
  selectGroupCells
} from './table.helper.functions';
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

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeTable(event, this.$root);
    } else if (isCell) {
      const $target = $(event.target);
      if (event.shiftKey) {
        selectGroupCells($target, this.selection, this.$root);
      } else {
        this.selection.select($target);
      }
    }
  }
}
