/* eslint-disable import/no-extraneous-dependencies */
const { MongoClient } = require('mongodb');
const logger = require('./logger');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/organizer';

class ConnectDB {
  constructor() {
    this.db = null;
    this.connectDB = this.connectDB.bind(this);
  }

  async connectDB() {
    if (this.db) return this.db;
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    this.db = client.db();
    logger.logInfo('DB created and retrieved: ', this.db);
    return this.db;
  }
}

module.exports = new ConnectDB();
