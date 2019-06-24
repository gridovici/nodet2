import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { defaultState } from '../constants';
import * as sagas from './sagas.mock';

// TODO: Uncomment this
// const defaultState = {
//   session: {},
//   comments: [],
//   users: [],
//   groups: [],
//   tasks: []
// };

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  (state = defaultState, action) => state,
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
