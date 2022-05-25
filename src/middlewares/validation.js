const Joi = require('joi');


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

module.exports = {
  schema,
  joiName,
  joiEmail,
  joiFavorite,
  joiPhone
}