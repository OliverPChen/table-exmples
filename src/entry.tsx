import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import 'perfect-scrollbar-react/dist/style.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}></Route>
    </Router>,
    document.getElementById('root'),
);
