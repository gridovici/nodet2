import {
  SET_TASK_COMPLETE,
  ADD_TASK_COMMENT,
  REQUEST_TASK_CREATION,
  CREATE_TASK,
  SET_TASK_GROUP,
  SET_TASK_NAME,
  REQUEST_AUTHENTICATE_USER,
  AUTHENTICATING,
  PROCESSING_AUTHENTICATE_USER,
  SET_STATE,
  REQUEST_USER_ACCOUNT_CREATION
} from '../constants';

export const setTaskCompletion = (id, isComplete = true) => ({
  type: SET_TASK_COMPLETE,
  taskID: id,
  isComplete
});

export const addTaskComment = (commentID, taskID, ownerID, content) => ({
  type: ADD_TASK_COMMENT,
  id: commentID,
  task: taskID,
  owner: ownerID,
  content
});

export const requestTaskCreation = groupID => ({
  type: REQUEST_TASK_CREATION,
  groupID
});

export const createTask = ({ taskID, groupID, ownerID }) => ({
  type: CREATE_TASK,
  taskID,
  groupID,
  ownerID
});

export const setTaskGroup = (taskID, groupID) => ({
  type: SET_TASK_GROUP,
  taskID,
  groupID
});

export const setTaskName = (taskID, name) => ({
  type: SET_TASK_NAME,
  taskID,
  name
});

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password
});

export const processAuthenticateUser = (status = AUTHENTICATING, session = null) => ({
  type: PROCESSING_AUTHENTICATE_USER,
  session,
  authenticated: status
});

export const setState = (state = {}) => ({
  type: SET_STATE,
  state
});


export const requestCreateUserAccount = (username, password) => ({
  type: REQUEST_USER_ACCOUNT_CREATION,
  username,
  password
});
