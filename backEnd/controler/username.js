const User = require('../models/UserName');
exports.addNewUser = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    const newUser = await User.create({
      username: username,
      password: password,
    });
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
