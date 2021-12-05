const Message = require('../models/Message');
const axios = require('axios');
const jwt = require('jsonwebtoken');
SECRET = process.env.SECRET;
exports.addNewMessage = async (req, res, next) => {
  try {
    let { token, message } = req.body;
    jwt.verify(token, SECRET, async (err, user) => {
      if (err) {
        return res.status(403).send('Invalid Access Token');
      }
      username = user.user;
      if (username === undefined) {
        throw { status: 400, message: 'username not exist' };
      }
      const NewMessage = await Message.create({
        username: username,
        message: message,
      });
      res.status(200).json(NewMessage);
      return sendToAll(NewMessage);
    });
  } catch (error) {
    next(error);
  }
};

let clients = [];

exports.getMessage = async (req, res, next) => {
  const messageList = await Message.find({});
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',

    // enabling CORS
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  });
  res.write(`data: ${JSON.stringify(messageList)}\n\n`);
  const newClient = {
    res,
  };
  clients.push(newClient);
};

function sendToAll(stream) {
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(stream)}\n\n`));
}
