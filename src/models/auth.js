const Joi = require('joi');

const userSchema = Joi.object({
  //   first_name: Joi.string().trim().required(),
  //   last_name: Joi.string().trim().required(),
  //   phone_number: Joi.number().required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().required(),
});

module.exports = { userSchema };
