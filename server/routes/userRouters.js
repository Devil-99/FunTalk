const express = require('express');
const { registerMiddleware } = require('../controller/usersController');

const router = express.Router();

router.post('/register',registerMiddleware);

module.exports=router;