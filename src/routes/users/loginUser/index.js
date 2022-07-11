const express = require('express');
const router = express.Router();

const createHandler = require('../../../utils/createHandler');
const userLogin = require('./handler');

const {createUserSchema: bodySchema} = require('../../../schemas/user')
const createValidation = require('../../../utils/schemaValidation');

router.post('/login', createValidation({body:bodySchema}), createHandler(userLogin))

module.exports = router