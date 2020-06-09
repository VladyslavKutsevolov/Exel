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
import { normalizeInitialState } from '../redux/initialState';

const storageName = param => `excel:${param}`;

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const storageState = storage(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState(storageState));

    const storeListener = debounce(
      state => storage(storageName(params), state),
      300
    );

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
