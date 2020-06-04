/* eslint-disable import/no-unresolved */
import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { defaultStyles } from '@/const';
import { createToolbar } from './toolbar.template';
import { $ } from '../../core/domHelper';

export default class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanges(changes) {
    this.setState(changes.currentStyles);
  }

  onClick({ target }) {
    const $target = $(target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$observer('toolbar:style', value);
    }
  }
}
