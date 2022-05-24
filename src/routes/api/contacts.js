const { ObjectID } = require('bson');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const urlDB = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const dbCollection = process.env.DB_COLLECTION;

// const client = new MongoClient(urlDB, {
//   useUnifiedTopology: true,
// });
// const { result } = require('lodash');
// const { isError } = require('joi');
// const {Users } = require("../../db/collection");
// const { mod } = require('prelude-ls');
//    const test = await Users.find({}).toArray();
//    console.log(test);

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(10).required(),
  email: Joi.string().email({
    minDomainSegments: 2, tlds: {
      allow: ['com', 'net']
    }
  }).required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  const client = await new MongoClient(urlDB, {
    useUnifiedTopology: true,
  }).connect();
  try{
    const result = await client
    .db(dbName)
    .collection(dbCollection)
    .find()
    .toArray();
    res.json({
      status: 'success',
      data: result,
    })
  } catch (err) {
    res.status(500).json({message: "Some mistake", err})
    next(err);
  }finally{
    await client.close();
  }
})

router.get(`/:contactId`, async (req, res, next) => {
  const client = await new MongoClient(urlDB, {
    useUnifiedTopology: true,
  }).connect();
  try {
    const id = new ObjectID(req.params.contactId);
    const result = await client
    .db(dbName)
    .collection(dbCollection)
    .findOne({_id: id}, {
      name: 1,
      email: 1,
      phone: 1,
    });
    if(result){
      res.json({
        status: "success",
        data: result
      })
    }else{
      res.sendStatus(404);
    }
  } catch (err) {
    res.json({
      status: 'mistake',
      message: err.message
    })
    next(err);
  }  finally {
    await client.close();
  }
})

router.delete(`/:contactId`, async (req, res, next) => {
  const client = await new MongoClient(urlDB, {
    useUnifiedTopology: true,
  }).connect();
  try {
    const id = new ObjectID(req.params.contactId);
    console.log(id);
    const result = await client
    .db(dbName)
    .collection(dbCollection)
    .deleteOne({_id: id})
    if(result){
      res.json({
        status: "success",
        data: result,
      })
    }else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.json({
      status: 'fail',
      error: error.message,
    })
    next(error);
  }finally {
    await client.close();
  }
})

router.post('/', async (req, res, next) => {
  const client = await new MongoClient(urlDB, {
    useUnifiedTopology: true,
  }).connect();
  try {
    const data = await schema.validateAsync(req.body);
    const result = await client
    .db(dbName)
    .collection(dbCollection)
    .insertOne(data);
    if(result){
      res.json({
       status: 'success',
       data: result
     })
    }else {
      res.sendStatus(500);
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      error: err.message
    });
    // res.json({
    //   status: 'Fail',
    //   error: err.message,
    // }).status(401);
    next(err);
  }finally {
    await client.close();
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    // if (await getContactById(req.params.id) === undefined) {
    //   res.json({
    //     status: "Not Found",
    //     code: 404,
    //   })
    // }
    await schema.validateAsync(req.body);
    res.json({
      status: "success",
      code: 201,
      data: console.log('update')
    })
  } catch (error) {
    res.json({
      status: 'fail',
      code: 400,
      error: error.message,
    })
  }
})

module.exports = router