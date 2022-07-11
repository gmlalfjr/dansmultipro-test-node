const Joi = require('joi');

const createUserSchema = Joi.object({
  password: Joi.string()
    .required()
    .description('password'),
  username: Joi.string()
    .required()
    .description('username'),
}).label('createUser');

module.exports = {createUserSchema};
``