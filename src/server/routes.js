/* eslint-disable class-methods-use-this */
const chalk = require('chalk');
const connect = require('./connect-db');

class Routes {
  constructor() {
    this.taskNew = this.taskNew.bind(this);
    this.taskUpdate = this.taskUpdate.bind(this);
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

  // async commentNew(req, res) {
  //   const { comment } = req.body;
  //   const db = await connect.connectDB();
  //   const collection = db.collection('comments');
  //   await collection.insertOne(comment);
  //   res.status(200).send();
  // }
}

module.exports = new Routes();
