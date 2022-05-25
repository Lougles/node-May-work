const app = require('./app')
const {connectMongo} = require('./src/db/connection');

const PORT = process.env.PORT || 4040
const start = async () =>  {
  await connectMongo();
    app.listen(PORT, (err) => {
    if (err) console.log('error', err);
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}

start()