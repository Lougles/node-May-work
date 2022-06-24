const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./src/routes/api/contacts');
const authRouter = require('./src/routes/api/auth');
const filesRouter = require('./src/routes/api/filesRouter');
const {errorHandler} = require('./src/helpers/trycatchHelper');

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json()) //middleware for parse req.body() 

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);
app.use(filesRouter);
app.use((req, res) => {
  res.status(404).json({ message: 'Error! Not Found' })
})
app.use(errorHandler);
module.exports = app