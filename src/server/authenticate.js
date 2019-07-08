/* eslint-disable import/prefer-default-export */
import uuid from 'uuid';
import md5 from 'md5';
import connectDB from './connect-db';
// import { assembleUserState } from './utility';

const authenticationTokens = [];

async function assembleUserState(user) {
  const db = await connectDB();

  const tasks = await db.collection('tasks').find({ owner: user.id }).toArray();
  const comments = await db.collection('comments').find({ task: { $in: tasks.map(task => task.id) } }).toArray();
  const groups = await db.collection('groups').find({ owner: user.id }).toArray();
//   const users = [
//     await db.collection('users').findOne({ id: user.id }),
//     ...await db.collection('users').find({ id: { $in: [...tasks, comments].map(x => x.owner) } }).toArray()
//   ];

  return {
    session: { authenticated: 'AUTHENTICATED', id: user.id },
    groups,
    comments,
    tasks
    // users,
  };
}

export const authenticationRoute = (app) => {
  app.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;
    const db = await connectDB();
    const collection = db.collection('users');

    const user = await collection.findOne({ name: username });
    console.log('SERVER: got user - ', user)
    if (!user) {
      return res.status(500).send('User not found');
    }

    // TODO: send pass as hash
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
    // const state = {};

    res.send({ token, state });
  });

  //   app.post('/user/create', async (req, res) => {
  //     const { username, password } = req.body;
  //     console.log(username, password);
  //     const db = await connectDB();
  //     const collection = db.collection('users');
  //     const user = await collection.findOne({ name: username });
  //     if (user) {
  //       res.status(500).send({ message: 'A user with that account name already exists.' });
  //       return;
  //     }

  //         let userID = uuid();
  //     const groupID = uuid();

  //     await collection.insertOne({
  //       name: username,
  //       id: userID,
  //       passwordHash: md5(password)
  //     });

  //     await db.collection('groups').insertOne({
  //       id: groupID,
  //       owner: userID,
  //       name: 'To Do'
  //     });

  //     const state = await assembleUserState({ id: userID, name: username });

//     res.status(200).send({ userID, state });
//   });
};
