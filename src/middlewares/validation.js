const Joi = require('joi');
const {validationError} = require('../helpers/errors')


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

const addUserValidation = (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(new validationError(validationResult.error));
  }
  next();
}
const updateNameValidation = (req, res, next) => {
  const validationResult = joiName.validate(req.body);
  if (validationResult.error) {
    next(new validationError(validationResult.error));
  }
  next();
}
const updateEmailValidation = (req, res, next) => {
  const validationResult = joiEmail.validate(req.body);
  if (validationResult.error) {
    next(new validationError(validationResult.error));
  }
  next();
}
const updatePhoneValidation = (req, res, next) => {
  const validationResult = joiPhone.validate(req.body);
  if (validationResult.error) {
    next(new validationError(validationResult.error));
  }
  next();
}
const updateFavoriteValidation = (req, res, next) => {
  const validationResult = joiFavorite.validate(req.body);
  if (validationResult.error) {
    next(new validationError(validationResult.error));
  }
  next();
}

module.exports = {
  addUserValidation,
  updateNameValidation,
  updateEmailValidation,
  updatePhoneValidation,
  updateFavoriteValidation
}