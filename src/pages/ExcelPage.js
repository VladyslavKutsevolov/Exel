/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-unresolved */
import { Page } from '@core/Page/Page';
import Formula from 'Component/formula/Formula';
import Table from 'Component/table/Table';
import Excel from 'Component/excel/Excel';
import Header from 'Component/header/Header';
import Toolbar from 'Component/toolbar/Toolbar';
import { createStore } from '@core/store/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { normalizeInitialState } from '../redux/initialState';
import StateProcessor from '../core/Page/StateProcessor';
import LocalStorageClient from '../core/shared/LocalStorageClient';

export class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
    this.processor = new StateProcessor(new LocalStorageClient(this.params));
  }

  async getRoot() {
    const storageState = await this.processor.get();
    const store = createStore(rootReducer, normalizeInitialState(storageState));

    this.storeSub = store.subscribe(this.processor.listen);

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
    this.storeSub.unSubscribe();
  }
}
