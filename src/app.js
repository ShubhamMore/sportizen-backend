const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const fs = require('fs');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require('morgan');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

require('./database/mongoose');

// const birthDayWishes = require('./functions/birthDayWishes');

// MANAGEMENT
const userRouter = require('./routers/user-route/user.route');
const userProfileRouter = require('./routers/user-route/user-profile.route');
const userConnectionRouter = require('./routers/user-connection-route/user-connection.route');
const chatRouter = require('./routers/chat-route/chat.route');
const eventRouter = require('./routers/event-route/event.route');
const eventPlayerRegistrationRouter = require('./routers/event-route/event-player-registration.route');
const eventTeamRegistrationRouter = require('./routers/event-route/event-team-registration.route');
const commentLikeRouter = require('./routers/post-route/comment-like.route');
const commentRouter = require('./routers/post-route/comment.route');
const replyCommentLikeRouter = require('./routers/post-route/reply-comment-like.route');
const replyCommentRouter = require('./routers/post-route/reply-comment.route');
const PostGalleryRouter = require('./routers/post-route/post-gallery.route');
const PostLikeRouter = require('./routers/post-route/post-like.route');
const PostViewRouter = require('./routers/post-route/post-view.route');
const postRouter = require('./routers/post-route/post.route');
const savePostRouter = require('./routers/post-route/save-post.route');
const blogRouter = require('./routers/blog-route/blog-route');
const productRouter = require('./routers/shopping-route/product.route');
const shoppingCartRouter = require('./routers/shopping-route/shopping-cart.route');

const app = express();

app.use(express.json());

app.use(cors());
app.use(compression());

app.use('/log', express.static(path.join('log')));
app.use('/images', express.static(path.join('images')));
app.use('/fileToUpload', express.static(path.join('fileToUpload')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('tiny'));

// NOSQL INJECTION
app.use(mongoSanitize());

// to replace prohibited characters with '_':
app.use(
  mongoSanitize({
    replaceWith: '_',
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
    stream: fs.createWriteStream(path.join(__dirname, '..', 'log', 'access.log'), {
      flags: 'a',
    }),
  })
);

// To Limit Incomming request from same IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
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
app.use(userProfileRouter);
app.use(userConnectionRouter);
app.use(chatRouter);
app.use(eventRouter);
app.use(eventPlayerRegistrationRouter);
app.use(eventTeamRegistrationRouter);
app.use(commentLikeRouter);
app.use(commentRouter);
app.use(replyCommentLikeRouter);
app.use(replyCommentRouter);
app.use(PostGalleryRouter);
app.use(PostLikeRouter);
app.use(PostViewRouter);
app.use(postRouter);
app.use(savePostRouter);
app.use(blogRouter);
app.use(productRouter);
app.use(shoppingCartRouter);

app.use((req, res, next) => {
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// birthDayWishes();

module.exports = app;
