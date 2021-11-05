import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';

import 'perfect-scrollbar-react/dist/style.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';
import { Router, browserHistory } from 'react-router';
import TableDTBasic from './pages/TableDTBasic';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
ReactDOM.render(<TableDTBasic />, document.getElementById('root'));
