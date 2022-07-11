const express = require('express');
const router = express.Router();
const {authorization} = require('../../../middlewares/authorization');
const createHandler = require('../../../utils/createHandler');
const jobDetail = require('./handler');

router.get('/job/detail-positions/:id', authorization, createHandler(jobDetail))

module.exports = router