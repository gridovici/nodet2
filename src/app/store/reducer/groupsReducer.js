import * as constants from '../../constants';

export default (state = [], action) => {
  switch (action.type) {
    case constants.SET_STATE:
      return action.state.groups;
    default:
      return state;
  }
};
