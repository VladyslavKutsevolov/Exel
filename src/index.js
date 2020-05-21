/* eslint-disable import/no-unresolved */
import './scss/index.scss';
import Header from 'Component/header/Header';
import Toolbar from 'Component/toolbar/Toolbar';
import Formula from 'Component/formula/Formula';
import Table from 'Component/table/Table';
import Excel from 'Component/excel/Excel';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
});

excel.render();
