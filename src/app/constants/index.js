export const SET_TASK_COMPLETE = 'SET_TASK_COMPLETE';
export const SET_TASK_GROUP = 'SET_TASK_GROUP';
export const SET_TASK_NAME = 'SET_TASK_NAME';
export const ADD_TASK_COMMENT = 'ADD_TASK_COMMENT';
export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION';
export const CREATE_TASK = 'CREATE_TASK';
export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER';
export const PROCESSING_AUTHENTICATE_USER = 'PROCESSING_AUTHENTICATE_USER';
export const AUTHENTICATING = 'AUTHENTICATING';
export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
export const SET_STATE = 'SET_STATE';
export const USERNAME_RESERVED = 'USERNAME_RESERVED';
export const REQUEST_USER_ACCOUNT_CREATION = 'REQUEST_USER_ACCOUNT_CREATION';

export const defaultState = {
  users: [{
    id: 'U1',
    name: 'Dev',
    passwordHash: 'TUPLES', // md5("TUPLES"),
    friends: ['U2']
  }, {
    id: 'U2',
    name: 'C. Eeyo',
    passwordHash: 'PROFITING', // md5('PROFITING'),
    friends: []
  }],
  groups: [{
    name: 'To Do',
    id: 'G1',
    owner: 'U1'
  }, {
    name: 'Doing',
    id: 'G2',
    owner: 'U1'
  }, {
    name: 'Done',
    id: 'G3',
    owner: 'U1'
  }
  ],
  tasks: [{
    name: 'Refactor tests',
    id: 'T1',
    group: 'G1',
    owner: 'U1',
    isComplete: false
  }, {
    name: 'Meet with CTO',
    id: 'T2',
    group: 'G1',
    owner: 'U1',
    isComplete: true
  }, {
    name: 'Compile ES6',
    id: 'T3',
    group: 'G2',
    owner: 'U2',
    isComplete: false
  }, {
    name: 'Update component snapshots',
    id: 'T4',
    group: 'G2',
    owner: 'U1',
    isComplete: true
  }, {
    name: 'Production optimizations',
    id: 'T5',
    group: 'G3',
    owner: 'U1',
    isComplete: false
  }],
  comments: [{
    owner: 'U1',
    id: 'C1',
    task: 'T1',
    content: 'Great work!'
  }]
};
