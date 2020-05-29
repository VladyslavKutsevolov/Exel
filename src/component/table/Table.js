/* eslint-disable import/no-unresolved */
import ExcelComponent from '@core/ExcelComponent';
import { $ } from '@core/domHelper';
import { createTable } from './table.template';
import { resizeTable } from './table.resize';
import {
  shouldResize,
  isCell,
  selectGroupCells,
  nextSelector
} from './table.helper.functions';
import { TableSelection } from './TableSelection';

export default class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$observer('formula:select', $cell);
    this.$dispatch({ type: 'TEST' });
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$subscribe('formula:input', text => {
      this.selection.curr.text(text);
    });
    this.$subscribe('formula:done', () => this.selection.curr.focus());
    this.$listen(state => console.log('TableState', state));
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeTable(event, this.$root);
    } else if (isCell) {
      const $target = $(event.target);
      if (event.shiftKey) {
        selectGroupCells($target, this.selection, this.$root);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight'
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.curr.id(true);
      const $nextCell = this.$root.find(nextSelector(key, id));
      this.selectCell($nextCell);
    }
  }

  onInput({ target }) {
    this.$observer('table:input', $(target));
  }
}
