/* eslint-disable import/no-unresolved */
import ExcelComponent from '@core/ExcelComponent';

export default class Header extends ExcelComponent {
  static className = 'excel__header';

  toHTML() {
    return '<h1>Heder</h1>';
  }
}
