// eslint-disable-next-line import/no-unresolved
import ExcelComponent from '@core/ExcelComponent';

export default class Formula extends ExcelComponent {
  static className = 'excel__formula';

  toHTML() {
    return '<h1>Formula</h1>';
  }
}
