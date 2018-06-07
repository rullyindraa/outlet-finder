const baseJoi = require('joi');
const extens = require('joi-date-extensions');
const Joi = baseJoi.extend(extens);

module.exports = Joi.object().keys({
  name: Joi.string().error(new Error('Business name is required.')).required(),
  description: Joi.string().error(new Error('Description is required.')).required()
})