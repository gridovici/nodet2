import { addNewTask, updateTask } from './server';

(async function testingDB() {
  await addNewTask({
    name: 'Some Task',
    id: '3333212'
  });
  await updateTask({
    name: 'Changed Task',
    id: '3333212'
  });
}());
