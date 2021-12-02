const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const mongo = process.env.DATABASE;
app.use(express.json());
app.use(cors());
// const jwt = require('jsonwebtoken');
require('dotenv').config();
mongoose
  .connect(
    'mongodb+srv://PhonebookoriDb:WsG9IKGGfG2WbtLn@firstmongo.w0kdo.mongodb.net/chat-history?retryWrites=true&w=majority'
  )
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });
const router = require('./backEnd/router/routes');
app.use('/', router);
app.get('/', (req, res) => {
  res.send('ahla yacov');
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`));
