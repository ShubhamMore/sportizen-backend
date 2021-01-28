const jwt = require('jsonwebtoken');
const User = require('../models/user-model/user.model');
const Sockets = require('./sockets');
const UserConnection = require('../models/user-connection-model/user-connection.model');

const socket = async (server) => {
  const io = require('socket.io')(server);

  io.of('/friend-request')
    .use(async (socket, next) => {
      if (socket.handshake.query && socket.handshake.query.token) {
        const token = socket.handshake.query.token.replace('Bearer ', '');

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
          if (err) return next(new Error('Authentication error'));
          const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token,
          });
          if (!user) {
            return next(new Error('Authentication error'));
          }
          socket.user = user;
          next();
        });
      } else {
        next(new Error('Authentication error'));
      }
    })
    .on('connection', (socket) => {
      new Sockets(socket.user._id, socket);
      socket.on('sendRequest', async (connectionReq) => {
        const newConnectionReq = new UserConnection({
          primaryUser: socket.user._id,
          followedUser: connectionReq.connectionId,
          status: connectionReq.status,
        });

        await newConnectionReq.save();

        const connectionReqEvent = {
          receiverId: socket.user._id,
          msg: {
            text: 'Request send Successfully',
          },
        };
        const receiver = Sockets.getSocket(connectionReq.receiverId);
        if (receiver) {
          receiver.emit('connectionReq', connectionReqEvent);
        }
        connectionReqEvent.receiverId = connectionReq.receiverId;
        socket.emit('connectionReq', connectionReqEvent);
      });

      socket.on('disconnect', () => {
        Sockets.deleteSocket(socket.user._id);
      });
    });
};

module.exports = socket;
