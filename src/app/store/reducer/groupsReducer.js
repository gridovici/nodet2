import * as constants from '../../constants';

// export default (state = constants.defaultState.groups, action) => {
export default (state = [], action) => {
  switch (action.type) {
    case constants.SET_STATE:
      return action.state.groups;
    default:
      return state;
  }
};
