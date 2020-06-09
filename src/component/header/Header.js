/* eslint-disable import/no-unresolved */
import ExcelComponent from '@core/ExcelComponent';
import { ActiveRoute } from '@core/routes/ActiveRoute';
import * as actions from '@/redux/actions';
import { defaultTitle } from '@/const';
import { $ } from '../../core/domHelper';

export default class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;

    return `<input type="text" class="input" value="${title}">
                <div>
                    <div class="button" data-btn="exit">
                        <span class="material-icons" data-btn="remove">
                            delete
                        </span>
                    </div>
                    <div class="button" data-btn="exit">
                        <span class="material-icons" data-btn="exit">
                            exit_to_app
                        </span>
                    </div>
                </div>`;
  }

  onInput({ target }) {
    const $target = $(target);
    this.$dispatch(actions.changeTitle($target.text()));
  }

  onClick({ target }) {
    const $target = $(target);

    if ($target.data.btn === 'remove') {
      // eslint-disable-next-line no-restricted-globals
      const decision = confirm('Are you sure want to delete table?');

      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.btn === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
