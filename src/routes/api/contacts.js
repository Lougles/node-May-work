const express = require('express');
const router = express.Router()
const Joi = require('joi');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const urlDB = process.env.DB_URL;
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
    .db('Users')
    .collection('Contacts')
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

// router.get('/', async (req, res, next) => {
//   try{
//     const users = await Users.find({}).toArray();
//     res.json({users});
//   }catch(e){

//   }
// },


router.get(`/:contactId`, async (req, res, next) => {
  try {
    const id = req.params.contactId;
    // if (await getContactById(id) === undefined) {
    //   res.json({
    //     status: 'Not found',
    //     code: 404,
    //     data: 'No data'
    //   })
    // }
    res.json({
      status: 'success',
      code: 200,
      data:  'get:ID'
    })
  } catch (err) {
    res.json({
      status: 'mistake',
      code: 500,
      message: err
    })
  }
}),

router.delete(`/:contactId`, async (req, res, next) => {
  try {
    const id = req.params.contactId;
    console.log("ID: ", id);
    // if (await getContactById(id) === undefined){
    //   res.json({
    //     status: 'Not Found',
    //     code: 404,
    //   })
    // }
    res.json({
      status: "success",
      code: 200,
      data: console.log('delete:id')
    })
  } catch (error) {
    res.json({
      status: 'fail',
      code: 400,
      error: error.message,
    })
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
     res.json({
      status: 'success',
      code: 201,
      data: console.log('add')
    })
  } catch (error) {
    res.json({
      status: 'fail',
      code: 400,
      error: error.message,
    })
    next(error);
  }
}),
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