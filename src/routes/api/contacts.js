const { ObjectID } = require('bson');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const modelsMiddleware = require("../../middlewares/models") 
 
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
  favorite: Joi.boolean().required(),
})
const joiName = Joi.object({
  name: Joi.string().alphanum().min(3).max(10).required(),
})
const joiEmail = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2, tlds: {
      allow: ['com', 'net']
    }
  }).required()
})

const joiFavorite = Joi.object({
  favorite: Joi.boolean().required(),
})
const joiPhone = Joi.object({
  phone: Joi.string().required(),
})

router.use(modelsMiddleware);

router.get('/', async (req, res, next) => {
  try{
    const result = await req.db.Users.find({}).toArray();
     res.json({
      status: 'success',
      data: result,
    })
  } catch (err) {
    res.status(500).json({message: "Some mistake", err})
    next(err);
  }
})

router.get(`/:contactId`, async (req, res, next) => {
  try {
    const id = new ObjectID(req.params.contactId);
    const result = await req.db.Users.findOne({_id: id}, {
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
  }
})

router.delete(`/:contactId`, async (req, res, next) => {
  try {
    const id = new ObjectID(req.params.contactId);
    const result = await req.db.Users.deleteOne({_id: id})
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
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = await schema.validateAsync(req.body);
    const result = await req.db.Users.insertOne(data);
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
    next(err);
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const id = new ObjectID(req.params.contactId);
    const {name, email, phone, favorite} = await schema.validateAsync(req.body);
    const result = await req.db.Users
    .findOneAndUpdate({_id: id}, { $set: {name, email, phone, favorite}});
    if (result){
      res.json({
        status: "success",
        data: result,
      })
    }else {
      res.sendStatus(304);
    }
  } catch (err) {
    res.json({
      status: 'fail',
      error: err.message,
    })
  }
})

router.put('/favorite/:contactId', async (req, res, next) => {
  try {
    const {favorite} = await joiFavorite.validateAsync(req.body);
    const id = new ObjectID(req.params.contactId);
    const result = await req.db.Users.
    findOneAndUpdate({_id: id},{ $set: {favorite}});
    if (result) {
      res.json({
        status: "Success",
        data: result,
      })
    }else {
      res.sendStatus(304);
    }
  } catch (err) {
    res.json({
      status: 'Fail',
      error: err.message
    })
  }
})

router.put('/phone/:contactId', async (req, res, next) => {
  try {
    const {phone} = await joiPhone.validateAsync(req.body);
    const id = new ObjectID(req.params.contactId);
    const result = await req.db.Users.findOneAndUpdate({_id: id},{ $set: {phone}});
    if (result) {
      res.json({
        status: "Success",
        data: result,
      })
    }else {
      res.sendStatus(304);
    }
  } catch (err) {
    res.json({
      status: 'Fail',
      error: err.message
    })
  }
})

router.put('/email/:contactId', async (req, res, next) => {
  try {
    const {email} = await joiEmail.validateAsync(req.body);
    const id = new ObjectID(req.params.contactId);
    const result = await req.db.Users.findOneAndUpdate({_id: id},{ $set: {email}});
    if (result) {
      res.json({
        status: "Success",
        data: result,
      })
    }else {
      res.sendStatus(304);
    }
  } catch (err) {
    res.json({
      status: 'Fail',
      error: err.message
    })
  }
})

router.put('/name/:contactId', async (req, res, next) => {
  try {
    const {name} = await joiName.validateAsync(req.body);
    const id = new ObjectID(req.params.contactId);
    const result = await req.db.Users.findOneAndUpdate({_id: id},{ $set: {name}});
    if (result) {
      res.json({
        status: "Success",
        data: result,
      })
    }else {
      res.sendStatus(304);
    }
  } catch (err) {
    res.json({
      status: 'Fail',
      error: err.message
    })
  }
})

module.exports = router