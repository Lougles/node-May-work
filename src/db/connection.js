const { MongoClient } = require('mongodb');
require('dotenv').config()
const {url, dbName, dbCollection} = process.env;
const collections = {};

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