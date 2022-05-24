const Joi = require('joi');

const userSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  phone_number: Joi.number(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().required(),
});

module.exports = { userSchema };
