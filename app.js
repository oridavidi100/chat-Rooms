const { errorHandlerMiddleware } = require('./backEnd/middlware/errorHandler');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const mongo = process.env.DATABASE;
app.use(express.json());
app.use(cors('*'));
// const jwt = require('jsonwebtoken');
require('dotenv').config();
mongoose
  .connect(process.env.DATABASE)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });
const router = require('./backEnd/router/routes');
app.use('/', router);

app.use(errorHandlerMiddleware);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`));
