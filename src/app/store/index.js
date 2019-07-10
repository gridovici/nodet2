/* eslint-disable no-restricted-syntax, guard-for-in */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import * as sagas from './sagas';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers(reducer),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (const saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
