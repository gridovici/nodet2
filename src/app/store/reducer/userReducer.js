import * as constants from '../../constants';

export default (state = constants.defaultState.users, action) => {
//   switch (action.type) {
//     case constants.CREATE_TASK:
//       return [...state, {
//         id: action.id,
//         name: 'New Task',
//         group: action.groupID,
//         owner: action.ownerID,
//         isComplete: false
//       }];
//     default:
//       return state;
//   }
  return state;
};
