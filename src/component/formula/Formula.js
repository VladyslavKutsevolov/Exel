// eslint-disable-next-line import/no-unresolved
import ExcelComponent from '@core/ExcelComponent';
import { $ } from '../../core/domHelper';

export default class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }

  toHTML() {
    return `<div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>`;
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');

    this.$subscribe('formula:select', $cell =>
      this.$formula.text($cell.data.value)
    );
  }

  storeChanges({ currentText }) {
    this.$formula.text(currentText);
  }

  onInput({ target }) {
    this.$observer('formula:input', $(target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$observer('formula:done');
    }
  }
}
