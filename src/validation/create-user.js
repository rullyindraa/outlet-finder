const baseJoi = require('joi');
const extens = require('joi-date-extensions');
const Joi = baseJoi.extend(extens);

module.exports = Joi.object().keys({
  username: Joi.string().error(new Error('Username')).required(),
  email: Joi.string().error(new Error('Email is required.')).required(),
  email: Joi.string().email().error(new Error('Email is invalid.')),
  password: Joi.string().error(new Error('Password is required')).required(),
  phone_number: Joi.string().error(new Error('Phone number is required')).required()
})