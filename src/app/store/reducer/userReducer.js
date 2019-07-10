import * as constants from '../../constants';

export default (state = [], action) => {
  // TODO: fix this
  switch (action.type) {
    case constants.SET_STATE:
      // return action.state.users;
      return state;
    default:
      return state;
  }
  // return state;
};
