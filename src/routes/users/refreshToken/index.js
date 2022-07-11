const express = require('express');
const router = express.Router();

const createHandler = require('../../../utils/createHandler');
const userRefreshToken = require('./handler');

const {refreshTokenSchema: bodySchema} = require('../../../schemas/refreshTokenSchema')
const createValidation = require('../../../utils/schemaValidation');

router.post('/refresh-token',createValidation({body:bodySchema}),  createHandler(userRefreshToken))

module.exports = router