const Joi = require('joi');

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string()
    .required()
    .description('refreshToken')
}).label('refreshToken');

module.exports = {refreshTokenSchema};
``