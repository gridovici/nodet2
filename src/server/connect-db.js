/* eslint-disable import/no-extraneous-dependencies */
const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/organizer';
let db = null;

async function connectDB() {
  if (db) return db;
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.info('DB created and retrieved: ', db);
  return db;
}

module.exports = {
  connectDB
};
