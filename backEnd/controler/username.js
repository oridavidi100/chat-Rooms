const User = require('../models/UserName');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
SECRET = process.env.SECRET;
exports.addNewUser = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const usersArr = await User.find({ $or: [{ email: email }, { username: username }] });
    if (usersArr.length > 0) {
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
    const usersArr = await User.find({ username: username });
    for (let user of usersArr) {
      let ans = await bcrypt.compare(password, user.password);
      if (ans === true) {
        await User.updateOne({ username: username }, { connected: true });
        const user = { password: password, user: username };
        const accessToken = jwt.sign(user, SECRET);
        return res.send({ ans: 'yes', accessToken: accessToken });
        console.log(usersArr[0]);
      }
    }
    if (usersArr.length > 0) {
      throw { status: 400, message: 'password incorrect' };
    }
    throw { status: 400, message: 'username not exist' };
  } catch (error) {
    console.log(error);
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
  const userList = await User.find({ connected: true });
  res.send(JSON.stringify(userList));
};
function sendToAll(stream) {
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(stream)}\n\n`));
}
