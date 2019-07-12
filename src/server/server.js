import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import chalk from 'chalk';

import connectDB from './connect-db';
import { authenticationRoute } from './authenticate';

const port = process.env.PORT || 3456;
const app = express();

// TODO: add route guard ?
// TODO: check dist folder <<- for production
// TODO: remove views and hbs files || for PROD serve hbs from gulp
// TODO: preprocessor ?
// TODO: sinon, jest
// TODO: SVG

// TODO: check components in repo for consistency
// TODO: add first 3 tasks

// TODO: add TravisCI, GitHub, Heroku and ENV vars process.env, server localhost hardcoded remove
// TODO: check fe, be and db in travis

// TODO: address all todos

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    // open('http://localhost:' + port);
    console.log(`Example app listening on port ${port}!`);
  }
});

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// Add plugins
app.use(
  cors(),
  bodyParser.urlencoded({ extended: true }), // for POST req
  bodyParser.json(),
  morgan('tiny')
);

authenticationRoute(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('/*', (req, res) => {
    // Not use webpack dev server in prod
    res.sendFile(path.resolve('index.html'));
  });
}

export const addNewTask = async (task) => {
  const db = await connectDB();
  const collection = db.collection('tasks');
  await collection.insertOne(task);
};

export const updateTask = async (task) => {
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

app.post('/task/new', async (req, res) => {
  const { task } = req.body;
  console.log(chalk.blue('Creating new task: ', task));
  await addNewTask(task);
  res.status(200).send();
});

app.post('/task/update', async (req, res) => {
  const { task } = req.body;
  await updateTask(task);
  res.status(200).send();
});

app.post('/comment/new', async (req, res) => {
  const { comment } = req.body;
  const db = await connectDB();
  const collection = db.collection('comments');
  await collection.insertOne(comment);
  res.status(200).send();
});
