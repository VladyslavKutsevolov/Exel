/* eslint-disable import/no-unresolved */
import ExcelComponent from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import { defaultTitle } from '@/const';
import { $ } from '../../core/domHelper';

export default class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;

    return `<input type="text" class="input" value="${title}">
                <div>
                    <div class="button">
                        <span class="material-icons">
                            delete
                        </span>
                    </div>
                    <div class="button">
                        <span class="material-icons">
                            exit_to_app
                        </span>
                    </div>
                </div>`;
  }

  onInput({ target }) {
    const $target = $(target);
    this.$dispatch(actions.changeTitle($target.text()));
  }
}
