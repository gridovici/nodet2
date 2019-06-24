import { createStore } from 'redux';
import { defaultState } from '../const';

// TODO: Uncomment this
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
