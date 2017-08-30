// This is the admin component that determines if a user is logged in
import React, { Component } from 'react';

import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  Redirect,
} from 'react-router';
import Api from './helpers/api';

import Template from './views/components/template';
import Login from './views/login';
import Home from './views/home';
import Content from './views/content';
import Upload from './views/upload';
import Gallery from './views/gallery/layout';
import Settings from './views/settings';


class Root extends Component {
  constructor(props) {
  	super(props);
  	this.state = {};
  }
  authenticate(nextState, replace, callback) {
    Api.authenticate()
    .then((authed) => {
      if (!authed.id) replace('/auth/login')
      return callback()
    })
    .catch((e) => {
      replace('/auth/login')
      return callback()
    })
  }
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="auth">
          <Route path="login" component={Login}/>
        </Route>
        <Route component={Template} onEnter={this.authenticate}>
          <Route  component={Content}>
            <Route path="live" component={Gallery} type='live' />
            <Route path="hidden" component={Gallery} type='hidden' />
          </Route>
          <Route path="upload" component={Upload}/>
          <Route path="settings" component={Settings}/>
        </Route>
        <Redirect from='*' to='/live'/>
      </Router>
    )
  }
}

export default Root
