const express = require('express');
const router = express.Router();
const { addNewUser, login } = require('../controler/username');
const { addNewMessage } = require('../controler/message');

router.post('/newuser', addNewUser);
router.post('/newmessage', addNewMessage);
router.get('/login/:password/:username', login);

module.exports = router;
