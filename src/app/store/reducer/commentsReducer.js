import * as constants from '../../constants';

// export default (state = constants.defaultState.comments, action) => {
export default (state = [], action) => {
  const {
    owner, task, content, id
  } = action;
  switch (action.type) {
    case constants.ADD_TASK_COMMENT:
      return [...state, {
        owner, task, content, id
      }];
      // TODO: add this
    // case constants.SET_STATE:
    //   return action.state.comments;
    default:
      return state;
  }
};
