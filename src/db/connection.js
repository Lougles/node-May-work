const { MongoClient } = require('mongodb');
require('dotenv').config()
const collections = {};
require('dotenv').config()
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const dbCollection = process.env.DB_COLLECTION;

const getCollection = () => {
  return collections;
}

const connectMongo = async () => {
  const client = await new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  collections.Users = db.collection(dbCollection);
}

module.exports = {
  connectMongo,
  getCollection
}