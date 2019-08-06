import { take, put, select } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';

import history from './history';
import * as actions from '../actions';
import * as constants from '../constants';

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3456';

export function* taskCreationSaga() {
  while (true) {
    // take = stop until specific action is dispatched
    const { groupID } = yield take(constants.REQUEST_TASK_CREATION);
    const ownerID = yield select(state => state.session.id);
    const taskID = uuid(); // done with random part
    // put - whatever action we pass in, send it to store
    yield put(actions.createTask({ taskID, groupID, ownerID }));
    try {
      const res = yield axios.post(`${url}/task/new`, {
        task: {
          id: taskID,
          group: groupID,
          owner: ownerID,
          isComplete: false,
          name: 'New Task'
        }
      });

      console.info('Response: ', res);
    } catch (err) {
      console.error('Error creating task: ', err);
    }
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

export function* commentCreationSaga() {
  while (true) {
    const comment = yield take(constants.ADD_TASK_COMMENT);
    axios.post(`${url}/comment/new`, { comment });
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(constants.REQUEST_AUTHENTICATE_USER);
    try {
      const { data } = yield axios.post(`${url}/authenticate`, { username, password });
      yield put(actions.setState(data.state));
      yield put(actions.processAuthenticateUser(constants.AUTHENTICATED, {
        id: data.state.session.id,
        token: data.token
      }));
      history.push('/dashboard');
    } catch (e) {
      /* catch block handles failed login */
      yield put(actions.processAuthenticateUser(constants.NOT_AUTHENTICATED));
    }
  }
}


export function* userAccountCreationSaga() {
  while (true) {
    const { username, password } = yield take(constants.REQUEST_USER_ACCOUNT_CREATION);
    try {
      const { data } = yield axios.post(`${url}/user/create`, { username, password });
      console.log(data);

      yield put(actions.setState({ ...data.state, session: { id: data.userID } }));
      yield put(actions.processAuthenticateUser(constants.AUTHENTICATED));

      history.push('/dashboard');
    } catch (e) {
      console.error('Error', e);
      yield put(actions.processAuthenticateUser(constants.USERNAME_RESERVED));
    }
  }
}
