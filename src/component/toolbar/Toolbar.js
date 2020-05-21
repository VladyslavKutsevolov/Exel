/* eslint-disable import/no-unresolved */
import ExcelComponent from '@core/ExcelComponent';

export default class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  toHTML() {
    return '<h1>Toolbar</h1>';
  }
}
