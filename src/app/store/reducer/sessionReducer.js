import * as constants from '../../constants';

// TODO: check this
export default (state = {}, action) => {
  const { type, authenticated } = action;
  switch (type) {
    case constants.SET_STATE:
      return { ...state, id: action.state.session.id };
    case constants.REQUEST_AUTHENTICATE_USER:
      return { ...state, authenticated: constants.AUTHENTICATING };
    case constants.PROCESSING_AUTHENTICATE_USER:
      return { ...state, authenticated };
    default:
      return state;
  }
};
