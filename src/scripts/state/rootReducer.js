import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  ui
} from './reducers';

export default combineReducers({
  routerReducer,
  ui,
});
