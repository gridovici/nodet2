import { MongoClient } from 'mongodb';

// TODO: rename organizer
const url = 'mongodb://localhost:27017/organizer';
let db = null;

export default async function connectDB() {
  if (db) return db;
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.info('DB retrieved: ', db);
  return db;
}
