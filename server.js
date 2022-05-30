const app = require('./app')
const {connectMongo} = require('./src/db/connection');
require('dotenv').config()


const PORT = process.env.PORT || 4040
const start = async () =>  {
  try{
    await connectMongo();
      app.listen(PORT, (err) => {
      if (err) console.log('error', err);
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  }catch(err) {
console.error(`Failed to start app with error:  ${err.message}`)
  }
}

start()