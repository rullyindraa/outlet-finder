const baseJoi = require('joi');
const extens = require('joi-date-extensions');
const Joi = baseJoi.extend(extens);

module.exports = Joi.object().keys({
  category: Joi.string().error(new Error('Line of Business is required.')).required(),
  name: Joi.string().error(new Error('Bisnis name is required.')).required(),
  email: Joi.string().error(new Error('Email is required.')).required(),
  email: Joi.string().email().error(new Error('Email is invalid.')),
  phone_number: Joi.string().error(new Error('Contact Number is Required')).required(),
  website: Joi.string().error(new Error('Website is required')).required(),
  description: Joi.string().error(new Error('description is required.')).required(),
  line1: Joi.string().error(new Error('Line 1 is required.')).required(),
  line2: Joi.string().error(new Error('Line 2 is required.')).required(),
  adm_area_lv1: Joi.string().error(new Error('Administrative Area Level 1 is required.')).required(),
  adm_area_lv2: Joi.string().error(new Error('Administrative Area Level 2 is required.')).required(),
  adm_area_lv3: Joi.string().error(new Error('Administrative Area Level 3 is required.')).required(),
  adm_area_lv4: Joi.string().error(new Error('Administrative Area Level 4 is required.')).required(),
  postal_code: Joi.string().error(new Error('Postal Code is required.')).required(),
  lat: Joi.string().error(new Error('Latitude is required.')).required(),
  lng: Joi.string().error(new Error('Longitude is required.')).required()
  // image: Joi.string().error(new Error('Image is Required')).required(),
})