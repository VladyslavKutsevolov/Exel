/* eslint-disable import/no-unresolved */
import { Page } from '@core/Page';
import Formula from 'Component/formula/Formula';
import Table from 'Component/table/Table';
import Excel from 'Component/excel/Excel';
import Header from 'Component/header/Header';
import Toolbar from 'Component/toolbar/Toolbar';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { storage, debounce } from '@core/utils';
import { initialState } from '@/redux/initialState';

export class ExcelPage extends Page {
  getRoot() {
    console.log(this.params);
    const store = createStore(rootReducer, initialState);

    const storeListener = state => debounce(storage('excel-state', state), 300);

    store.subscribe(storeListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
