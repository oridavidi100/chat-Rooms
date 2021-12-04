const User = require('../models/UserName');
const jwt = require('jsonwebtoken');
require('dotenv').config();
SECRET = process.env.SECRET;
exports.addNewUser = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const usersArr = await User.find({ $or: [{ email: email }, { username: username }] });
    if (usersArr.length > 0) {
      // next({ status: 404, messege: 'Username or email already exists' });
      throw { status: 404, message: 'Username or email already exists' };
    }
    const newUser = await User.create({
      username: username,
      email: email,
      password: password,
      connected: false,
    });
    res.status(200).send(newUser);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { password, username } = req.params;

    const usersArr = await User.find({ username: username, password: password });
    if (usersArr.length > 0) {
      await User.updateOne({ username: username }, { connected: true });
      const user = { password: password, user: username };
      const accessToken = jwt.sign(user, SECRET);
      return res.send({ ans: 'yes', accessToken: accessToken });
    } else {
      throw { status: 400, message: 'username not exist' };
    }
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { username } = req.params;
    const thos = await User.updateOne({ username: username }, { connected: false });
    res.send(thos);
  } catch (error) {
    next(error);
  }
};

exports.getusers = async (req, res, next) => {
  const userList = await User.find({});
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',

    // enabling CORS
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  });
  res.write(`data: ${JSON.stringify(userList)}\n\n`);
};
