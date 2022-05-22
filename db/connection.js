const { MongoClient } = require('mongodb');
require('dotenv').config()

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

const connectMongo = async () => {
  const client = await MongoClient(url).connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('Contacts');
}

module.exports = {
  connectMongo
}