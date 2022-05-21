const app = require('./app')
require('dotenv').config()
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const client = new MongoClient(url);

const dbName = 'Users'
// const PORT = process.env.PORT || 4040

// const start = async () => {
//   const client = await MongoClient.connect(process.env.MONGO_URL, {UseNewUrlParser: true, UseUnifiedTopology: true});
//    const db = client.db();
//    const Users =  db.collection('contacts');
//    const test = await Users.find({}).toArray();
//    console.log(test);

//   app.listen(PORT, (err) => {
//     if (err) console.log('error', err);
//     console.log(`Server running. Use our API on port: ${PORT}`)
//   })
// }

const start = async () =>  {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('Contacts');
  const test = await collection.find({}).toArray();
  console.log(test);
  // the following code examples can be pasted here...

  return 'done.';
}

start()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());