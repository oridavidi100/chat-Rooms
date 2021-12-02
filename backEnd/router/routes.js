const express = require('express');
const router = express.Router();
const { addNewUser } = require('../controler/username');
const { addNewPost } = require('../controler/post');

router.post('/newuser', addNewUser);
router.post('/newpost', addNewPost);

module.exports = router;
