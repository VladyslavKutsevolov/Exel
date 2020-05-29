/* eslint-disable import/no-unresolved */
import './scss/index.scss';
import Header from 'Component/header/Header';
import Toolbar from 'Component/toolbar/Toolbar';
import Formula from 'Component/formula/Formula';
import Table from 'Component/table/Table';
import Excel from 'Component/excel/Excel';
import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
});

excel.render();
