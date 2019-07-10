import * as constants from '../../constants';

export default (state = [], action) => {
  const {
    owner, task, content, id
  } = action;
  switch (action.type) {
    case constants.ADD_TASK_COMMENT:
      return [...state, {
        owner, task, content, id
      }];
    case constants.SET_STATE:
      return action.state.comments;
    default:
      return state;
  }
};
