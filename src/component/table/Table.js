/* eslint-disable import/no-unresolved */
import ExcelComponent from '@core/ExcelComponent';
import { $ } from '@core/domHelper';
import * as actions from '../../redux/actions';
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
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$observer('formula:select', $cell);
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$subscribe('formula:input', text => {
      this.selection.curr.text(text);
      this.updateCellState(text);
    });
    this.$subscribe('formula:done', () => this.selection.curr.focus());
  }

  async resizeHandler(event) {
    try {
      const data = await resizeTable(event, this.$root);
      this.$dispatch(actions.tableResizeAction(data));
    } catch (error) {
      console.warn('Resize Error', error.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeHandler(event);
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

  updateCellState(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.curr.id(),
        text: value
      })
    );
  }

  onInput({ target }) {
    this.updateCellState($(target).text());
  }
}
