// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoClient } from 'mongodb';

// TODO: rename organizer
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/organizer';
let db = null;

export default async function connectDB() {
  if (db) return db;
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.info('DB retrieved: ', db);
  return db;
}
