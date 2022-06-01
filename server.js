const app = require('./app');
const {connectMongo} = require('./src/db/connection');
require('dotenv').config();


const PORT = process.env.PORT || 4040
const start = async () =>  {
  try{
    await connectMongo();
      app.listen(PORT, (err) => {
      if (err) console.log('error', err);
      console.log(`Database connection successful on Port: ${PORT}`);
    })
  }catch(err) {
    console.error(`Failed to start app with error:  ${err.message}`);
    process.exit(1);
  }
}

start();