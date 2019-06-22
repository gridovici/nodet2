import { createStore } from 'redux';
import { defaultState } from '../const';

// const defaultState = {
//   session: {},
//   comments: [],
//   users: [],
//   groups: [],
//   tasks: []
// };

const store = createStore(
  (state = defaultState, action) => {
    return state;
  }
);

export default store;
