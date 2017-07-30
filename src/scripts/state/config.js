import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducer from './rootReducer';
import { browserHistory } from 'react-router';

const sagaMiddleware = createSagaMiddleware();

let middleware = [applyMiddleware(sagaMiddleware)];
if ( window.__REDUX_DEVTOOLS_EXTENSION__ ) {
    middleware.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

const createStoreWithMiddleware = compose.apply(undefined, middleware)(createStore);

function configureStore() {
  let initialState = {};
  let store = createStoreWithMiddleware(reducer, initialState);
  // sagaMiddleware.run(asyncActions);
  return store;
}

export default configureStore()
