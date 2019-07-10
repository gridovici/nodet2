/* eslint-disable guard-for-in, no-await-in-loop, no-restricted-syntax */
import { defaultState } from '../app/constants';
import connectDB from './connect-db';

async function initializeDB() {
  const db = await connectDB();
  for (const collectionName in defaultState) {
    const collection = db.collection(collectionName);
    await collection.insertMany(defaultState[collectionName]);
  }
}

initializeDB();
