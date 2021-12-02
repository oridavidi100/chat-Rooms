const Message = require('../models/Message');
exports.addNewMessage = async (req, res, next) => {
  try {
    let { username, message } = req.body;
    const NewMessage = await Message.create({
      username: username,
      message: message,
    });
    res.status(200).json(NewMessage);
  } catch (error) {
    next(error);
  }
};
