const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
var cors = require('cors');

require('./database/mongoose');

// const birthDayWishes = require('./functions/birthDayWishes');

// MANAGEMENT
const userRouter = require('./routers/user.route');

const app = express();

app.use(express.json());

app.use(cors());
app.use(compression());

app.use('/fileToUpload', express.static(path.join('fileToUpload')));

// CONTENT
app.use('/image-categories', express.static(path.join('image-categories')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// CONTENT
app.use(userRouter);

app.use((req, res, next) => {
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// birthDayWishes();

module.exports = app;
