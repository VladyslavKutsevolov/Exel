/* eslint-disable import/no-unresolved */
import ExcelComponent from '@core/ExcelComponent';
import { createToolbar } from './toolbar.template';
import { $ } from '../../core/domHelper';

export default class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    });
  }

  toHTML() {
    return createToolbar();
  }

  onClick({ target }) {
    const $target = $(target);
    if ($target.data.type === 'button') {
      console.log($target.data.value);
    }
  }
}
