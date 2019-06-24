import { take, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import uuid from 'uuid';
import history from './history';

import * as actions from '../actions';
import * as constants from '../constants';

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(constants.REQUEST_TASK_CREATION);
    console.log('got group id ', groupID);
  }
}

// export function* taskCreationSaga() {
//   while (true) {
//     const { groupID } = yield take(constants.REQUEST_TASK_CREATION);
//     const ownerID = yield select(state => state.session.id);
//     const taskID = uuid();
//     yield put(actions.createTask(taskID, groupID, ownerID));
//   }
// }

// export function* userAuthenticationSaga() {
//   while (true) {
//     const { username, password } = yield take(constants.REQUEST_AUTHENTICATE_USER);
//     yield delay(250);
//     yield put(actions.processAuthenticateUser(constants.AUTHENTICATED, {
//       id: 'U1',
//       token: 'ABCD-1234'
//     }));

//     history.push('/dashboard');
//   }
// }
