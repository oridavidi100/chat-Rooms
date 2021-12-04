const express = require('express');
const router = express.Router();
const { addNewUser, login, logout, getusers } = require('../controler/username');
const { addNewMessage, stream, getMessage } = require('../controler/message');

router.post('/newuser', addNewUser);
router.post('/newmessage', addNewMessage);
router.get('/login/:password/:username', login);
router.get('/getMessage', getMessage);
router.get('/logout/:username', logout);
router.get('/getusers', getusers);
module.exports = router;
