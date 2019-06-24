import * as constants from '../../constants';

export default (state = constants.defaultState.tasks, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
