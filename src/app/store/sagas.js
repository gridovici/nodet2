import { take, put, select } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';
import history from './history';

import * as actions from '../actions';
import * as constants from '../constants';

const url = 'http://localhost:3456';

export function* taskCreationSaga() {
  while (true) {
    // take = stop until specific action is dispatched
    const { groupID } = yield take(constants.REQUEST_TASK_CREATION);
    const ownerID = 'U1';
    const taskID = uuid(); // done with random part
    // put - whatever action we pass in, send it to store
    yield put(actions.createTask({ taskID, groupID, ownerID }));
    const { res } = yield axios.post(`${url}/task/new`, {
      task: {
        id: taskID,
        group: groupID,
        isComplete: false,
        name: 'New Task'
      }
    });

    console.info('Response: ', res);
  }
}

export function* taskModificationSaga() {
  while (true) {
    // If any of the actions in take array are dispatched this code will run
    const task = yield take([
      constants.SET_TASK_GROUP,
      constants.SET_TASK_NAME,
      constants.SET_TASK_COMPLETE]);
    axios.post(`${url}/task/update`, {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete
      }
    });
  }
}
