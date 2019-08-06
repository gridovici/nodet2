import * as constants from '../../constants';

export default (state = [], action) => {
  switch (action.type) {
    case constants.SET_STATE:
      return state;
    default:
      return state;
  }
};
