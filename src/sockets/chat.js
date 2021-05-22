const jwt = require('jsonwebtoken');
const User = require('../models/user-model/user.model');
const Socket = require('./socket');
const Chat = require('../models/chat-model/chat.model');

const emitOnlineStatus = require('./services/emit-online-status');

const chatting = async (server) => {
  const io = require('socket.io')(server);

  io.of('/sportizen-chat')
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
    .on('connection', async (socket) => {
      new Socket(socket.user.sportizenId, socket);
      // io.emit('isOnline', { sportizenUser: socket.user.sportizenId, isOnline: false });

      // await emitOnlineStatus(socket.user.sportizenId, true);

      socket.on('message', async (message) => {
        const chatMessage = {
          senderId: socket.user.sportizenId,
          receiverId: message.receiverId,
          message: message.message,
          date: Date.now(),
        };

        const newMessage = new Chat(chatMessage);

        await newMessage.save();

        const receiver = Socket.getSocket(message.receiverId);

        if (receiver) {
          receiver.emit('message', newMessage);
        }

        socket.emit('message', newMessage);
      });

      socket.on('disconnect', async () => {
        // await emitOnlineStatus(socket.user.sportizenId, false);
        Socket.deleteSocket(socket.user.sportizenId);
      });
    });
};

module.exports = chatting;
