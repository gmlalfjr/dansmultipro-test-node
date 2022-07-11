const express = require('express');
const router = express.Router();

const createHandler = require('../../../utils/createHandler');
const registerUser = require('./handler');

const {createUserSchema: bodySchema} = require('../../../schemas/user')
const createValidation = require('../../../utils/schemaValidation');

router.post('/create',createValidation({body:bodySchema}), createHandler(registerUser))

module.exports = router