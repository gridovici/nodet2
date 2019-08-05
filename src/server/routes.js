/* eslint-disable consistent-return, class-methods-use-this */
const chalk = require('chalk');
const uuid = require('uuid');
const md5 = require('md5');
const connect = require('./connect-db');
const logger = require('./logger');

class Routes {
  constructor() {
    this.authenticationTokens = [];
    this.taskNew = this.taskNew.bind(this);
    this.taskUpdate = this.taskUpdate.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async addNewTask(task) {
    const db = await connect.connectDB();
    const collection = db.collection('tasks');
    await collection.insertOne(task);
  }

  async updateTask(task) {
    const {
      id, group, isComplete, name
    } = task;
    const db = await connect.connectDB();
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
  }

  async taskNew(req, res) {
    const { task } = req.body;
    console.log(chalk.green('Creating new task: '), task);
    await this.addNewTask(task);
    res.status(200).send();
  }

  async taskUpdate(req, res) {
    const { task } = req.body;
    console.log(chalk.blue('Updating task: '), task);
    await this.updateTask(task);
    res.status(200).send();
  }

  async assembleUserState(user) {
    const db = await connect.connectDB();

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

  async authenticate(req, res) {
    console.log(chalk.yellow.bold('Received REQ!'));
    const { username, password } = req.body;

    try {
      const db = await connect.connectDB();
      const collection = db.collection('users');
      const user = await collection.findOne({ name: username });

      if (!user) {
        logger.logError('Tried log with incorrect username');
        return res.status(500).send('User not found');
      }

      const hash = md5(password);
      const passwordCorrect = (hash === user.passwordHash);

      if (!passwordCorrect) {
        logger.logError('Tried log with incorrect password');
        return res.status(500).send('Password incorrect');
      }

      const token = uuid();

      this.authenticationTokens.push({
        token,
        userID: user.id
      });

      const state = await this.assembleUserState(user);

      res.send({ token, state });
    } catch (err) {
      // console.log('NO AUTH!: ', err.message);
      logger.logError('NO AUTH!: ', err.message);
      res.status(500).send({ message: err.message });
    }
  }

  async createUser(req, res) {
    const { username, password } = req.body;

    try {
      const db = await connect.connectDB();
      const userCollection = db.collection('users');
      const user = await userCollection.findOne({ name: username });

      if (user) {
        logger.logError('A user with that account name already exists.');
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

      const state = await this.assembleUserState({ id: userID, name: username });

      res.status(200).send({ userID, state });
    } catch (err) {
      logger.logError(err.message);
      res.status(500).send({ message: err.message });
    }
  }

  // async commentNew(req, res) {
  //   const { comment } = req.body;
  //   const db = await connectDB();
  //   const collection = db.collection('comments');
  //   await collection.insertOne(comment);
  //   res.status(200).send();
  // }
}

module.exports = new Routes();
