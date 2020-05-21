/* eslint-disable import/no-unresolved */
import ExcelComponent from '@core/ExcelComponent';

export default class Table extends ExcelComponent {
  static className = 'excel__table';

  toHTML() {
    return '<h1>Table</h1>';
  }
}
