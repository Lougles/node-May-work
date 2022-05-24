const app = require('./app')
// const MongoClient = require('mongodb').MongoClient;
// const {connectMongo} = require('./src/db/connection');
require('dotenv').config()


const PORT = process.env.PORT || 4040
const start = async () =>  {
  // await connectMongo();
    app.listen(PORT, (err) => {
    if (err) console.log('error', err);
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}

start()
  // .then(console.log)
  // .catch(console.error)
  // .finally(() => client.close());