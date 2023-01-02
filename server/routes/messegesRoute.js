const express = require('express');
const { addMessege , getAllMessege , deleteMsg} = require('../controller/messegesController');

const router = express.Router();

router.post('/addmsg',addMessege);
router.post('/getmsg',getAllMessege);

module.exports=router;