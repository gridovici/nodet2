import * as constants from '../../constants';

export default (state = [], action) => {
  switch (action.type) {
    case constants.SET_STATE:
      return action.state.tasks;
    case constants.CREATE_TASK:
      return [...state, {
        id: action.taskID,
        name: 'New Task',
        group: action.groupID,
        owner: action.ownerID,
        isComplete: false
      }];
    case constants.SET_TASK_COMPLETE:
      return state.map(task => (task.id === action.taskID
        ? { ...task, isComplete: action.isComplete }
        : task));
    case constants.SET_TASK_GROUP:
      return state.map(task => ((task.id === action.taskID)
        ? { ...task, group: action.groupID }
        : task));
    case constants.SET_TASK_NAME:
      return state.map(task => ((task.id === action.taskID)
        ? { ...task, name: action.name }
        : task));
    default:
      return state;
  }
};
