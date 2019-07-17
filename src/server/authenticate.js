/* eslint-disable import/prefer-default-export */
const uuid = require('uuid');
const md5 = require('md5');
const chalk = require('chalk');

const { connectDB } = require('./connect-db');
// import { assembleUserState } from './utility';

const authenticationTokens = [];

async function assembleUserState(user) {
  const db = await connectDB();

  const tasks = await db.collection('tasks').find({ owner: user.id }).toArray();
  const comments = await db.collection('comments').find({ task: { $in: tasks.map(task => task.id) } }).toArray();
  const groups = await db.collection('groups').find({ owner: user.id }).toArray();
  //   const users = [
  //     await db.collection('users').findOne({ id: user.id }),
  // ...await db.collection('users').
  //  find({ id: { $in: [...tasks, comments].map(x => x.owner) } }).toArray()
  //   ];

  return {
    session: { authenticated: 'AUTHENTICATED', id: user.id },
    groups,
    comments,
    tasks
    // users,
  };
}

const authenticationRoute = (app) => {
  // eslint-disable-next-line consistent-return
  app.post('/authenticate', async (req, res) => {
    console.log(chalk.yellow.bold('Received REQ!'));
    console.log(connectDB);
    const { username, password } = req.body;

    try {
      const db = await connectDB();
      const collection = db.collection('users');
      const user = await collection.findOne({ name: username });

      if (!user) {
        return res.status(500).send('User not found');
      }

      const hash = md5(password);
      const passwordCorrect = (hash === user.passwordHash);

      if (!passwordCorrect) {
        return res.status(500).send('Password incorrect');
      }

      const token = uuid();

      authenticationTokens.push({
        token,
        userID: user.id
      });

      const state = await assembleUserState(user);

      res.send({ token, state });
    } catch (err) {
      console.log('NO AUTH!: ', err.message);
      res.status(500).send({ message: err.message });
    }
  });

  app.post('/user/create', async (req, res) => {
    const { username, password } = req.body;

    try {
      const db = await connectDB();
      const userCollection = db.collection('users');
      const user = await userCollection.findOne({ name: username });

      if (user) {
        res.status(500).send({ message: 'A user with that account name already exists.' });
        return;
      }

      const userID = uuid();

      await userCollection.insertOne({
        name: username,
        id: userID,
        passwordHash: md5(password)
      });

      await db.collection('groups').insertMany([{
        id: uuid(),
        owner: userID,
        name: 'To Do'
      }, {
        id: uuid(),
        owner: userID,
        name: 'Doing'
      }, {
        id: uuid(),
        owner: userID,
        name: 'Done'
      }]);

      const state = await assembleUserState({ id: userID, name: username });

      res.status(200).send({ userID, state });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
};

module.exports = {
  authenticationRoute
};
