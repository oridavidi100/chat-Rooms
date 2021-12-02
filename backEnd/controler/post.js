const Post = require('../models/Post');
exports.addNewPost = async (req, res, next) => {
  try {
    let { username, body } = req.body;
    const newPost = await Post.create({
      username: username,
      body: body,
    });
    res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
};
