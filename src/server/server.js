import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import connectDB from './connect-db';
import { authenticationRoute } from './authenticate';

const port = 3456;
const app = express();


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
  await addNewTask(task);
  res.status(200).send();
});

app.post('/task/update', async (req, res) => {
  const { task } = req.body;
  await updateTask(task);
  res.status(200).send();
});
