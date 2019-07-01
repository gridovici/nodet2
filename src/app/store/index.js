import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// import { defaultState, CREATE_TASK } from '../constants';
// import * as sagas from './sagas.mock';
import * as sagas from './sagas';
import reducer from './reducer';

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
  // (state = defaultState, action) => state,
  combineReducers(reducer),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (const saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
