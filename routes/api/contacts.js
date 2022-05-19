const express = require('express');
const { result } = require('lodash');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require("../../models/contacts")
const router = express.Router()
const Joi = require('joi');
const { isError } = require('joi');

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
  try {
    res.json({
      status: 'success',
      code: 200,
      data: await listContacts()
    })
  } catch (err) {
    res.status(500).json({message: "Some mistake", err})
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    if (await getContactById(id) === undefined) {
      res.json({
        status: 'Not found',
        code: 404,
        data: 'No data'
      })
    }
    res.json({
      status: 'success',
      code: 200,
      data: await getContactById(id)
    })
  } catch (err) {
    res.json({
      status: 'mistake',
      code: 500,
      message: err
    })
  }
})

router.post('/', async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
     res.json({
      status: 'success',
      code: 201,
      data: await addContact(req.body)
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

router.delete('/:contactId', async (req, res, next) => {
  try {
    // const id = req.params.contactId;                      // запрос поступает сразу же? Или нужно тоже через await?
    console.log("ID: ",req.params.contactId);
    if (await removeContact(req.params.contactId) === undefined){
      res.json({
        status: 'Not Found',
        code: 404,
      })
    }
    res.json({
      status: "success",
      code: 200,
      data: await removeContact(req.params.contactId),
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

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router