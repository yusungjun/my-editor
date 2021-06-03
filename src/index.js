import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import './css/common.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'mobx-react';
import RootStore from './stores';
import { BrowserRouter } from 'react-router-dom';

const root = new RootStore();

ReactDOM.render(
  <Provider {...root}>
    <BrowserRouter basename='/rozeus_editor'>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
