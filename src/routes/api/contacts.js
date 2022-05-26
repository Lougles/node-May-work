const { ObjectID } = require('bson');
const express = require('express');
const router = express.Router();
const {schema, joiName, joiEmail, joiPhone, joiFavorite} = require('../../middlewares/validation');
const modelsMiddleware = require("../../middlewares/models");

// const { result } = require('lodash');
// const { isError } = require('joi');
// const { mod } = require('prelude-ls');

router.use(modelsMiddleware);

router.get('/', async (req, res, next) => {
  try{
    const result = await req.db.Users.find({}).toArray();
     res.json({
      status: 'success',
      data: result,
    })
  } catch (err) {
    res.status(500).json({message: "Some mistake", err});
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
      res.sendStatus(404).json({
        status: "Not Found"
      });
    }
  } catch (err) {
    res.json({
      status: 'fail',
      error: error.message,
    })
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
      res.json({
        status: "Fail",
      })
    }
  } catch (err) {
    res.json({
      status: "Fail",
      error: err.message
    });
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