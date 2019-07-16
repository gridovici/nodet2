/* eslint-disable guard-for-in, no-await-in-loop, no-restricted-syntax */
const { defaultState } = require('../app/constants');
const connectDB = require('./connect-db');

async function initializeDB() {
  const db = await connectDB();
  for (const collectionName in defaultState) {
    const collection = db.collection(collectionName);
    await collection.insertMany(defaultState[collectionName]);
  }
}

initializeDB();
