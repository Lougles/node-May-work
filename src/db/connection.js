const mongoose = require('mongoose');
require('dotenv').config()

const connectMongo = async () => {
  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  connectMongo
}