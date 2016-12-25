// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import TimerPage from './timer';
import CounterPage from './containers/CounterPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={TimerPage} />
    <Route path="/counter" component={CounterPage} />
  </Route>
);
