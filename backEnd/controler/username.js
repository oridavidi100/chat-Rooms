const User = require('../models/UserName');
exports.addNewUser = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = await User.create({
      username: username,
      email: email,
      password: password,
    });
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { password, username } = req.params;
  try {
    const usersArr = await User.find({ username: username, password: password });
    if (usersArr.length > 0) {
      return res.send('yes');
    } else {
      return res.send('no');
    }
  } catch (error) {
    next(error);
  }
};
