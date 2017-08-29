// eslint-disable-next-line
import Globals from './globals'
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Router from './router';
import store from './state/config';

import 'react-select/dist/react-select.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}


export default App;
