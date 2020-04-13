const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
var cors = require('cors');
const fs = require('fs');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

require('./database/mongoose');

// const birthDayWishes = require('./functions/birthDayWishes');

// MANAGEMENT
const userRouter = require('./routers/user.route');
const tournamentRouter = require('./routers/tournament.route');

const app = express();

app.use(express.json());

app.use(cors());
app.use(compression());

app.use('/log', express.static(path.join('log')));
app.use('/images', express.static(path.join('images')));
app.use('/fileToUpload', express.static(path.join('fileToUpload')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// NOSQL INJECTION
app.use(mongoSanitize());

// to replace prohibited characters with '_':
app.use(
  mongoSanitize({
    replaceWith: '_'
  })
);

// Prevents HTML Code in Input Fields
app.use(xss());

// Prevents HTTP Parameter Pollution, i.e. Duplicate Parameter in Query String
app.use(hpp());

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// HTTP request logger
app.use(
  morgan('combined', {
    stream: fs.createWriteStream(
      path.join(__dirname, '..', 'log', 'access.log'),
      {
        flags: 'a'
      }
    )
  })
);

// To Limit Incomming request from same IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

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
app.use(tournamentRouter);

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
