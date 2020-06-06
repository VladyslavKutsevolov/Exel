/* eslint-disable import/no-unresolved */
import './scss/index.scss';
import { Router } from '@core/routes/Router';
import { DashBoardPage } from './pages/DashBoardPage';
import { ExcelPage } from './pages/ExcelPage';
// import Header from 'Component/header/Header';
// import Toolbar from 'Component/toolbar/Toolbar';
// eslint-disable-next-line no-new
new Router('#app', {
  dashboard: DashBoardPage,
  excel: ExcelPage
});
