const express = require('express');
const router = express.Router();
const {authorization} = require('../../../middlewares/authorization');
const createHandler = require('../../../utils/createHandler');
const listJob = require('./handler');

router.get('/job', authorization, createHandler(listJob))

module.exports = router