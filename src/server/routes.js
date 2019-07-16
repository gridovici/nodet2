const chalk = require('chalk');
const connectDB = require('./connect-db');

const addNewTask = async (task) => {
  const db = await connectDB();
  const collection = db.collection('tasks');
  await collection.insertOne(task);
};

const updateTask = async (task) => {
  const {
    id, group, isComplete, name
  } = task;
  const db = await connectDB();
  const collection = db.collection('tasks');

  if (group) {
    await collection.updateOne({ id }, { $set: { group } });
  }
  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }
  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }
};

const taskNew = async (req, res) => {
  const { task } = req.body;
  console.log(chalk.blue('Creating new task: '), task);
  await addNewTask(task);
  res.status(200).send();
};

const taskUpdate = async (req, res) => {
  const { task } = req.body;
  console.log(chalk.blue('Updating task: '), task);
  await updateTask(task);
  res.status(200).send();
};

const commentNew = async (req, res) => {
  const { comment } = req.body;
  const db = await connectDB();
  const collection = db.collection('comments');
  await collection.insertOne(comment);
  res.status(200).send();
};

module.exports = {
  addNewTask,
  updateTask,
  taskNew,
  taskUpdate,
  commentNew
};
