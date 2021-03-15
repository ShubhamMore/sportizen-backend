const jwt = require('jsonwebtoken');
const User = require('../models/user-model/user.model');
const ChatSockets = require('./sockets');
const Chat = require('../models/chat-model/chat.model');

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
    .on('connection', (socket) => {
      new ChatSockets(socket.user.sportizenId, socket);

      socket.on('message', async (message) => {
        const chatMessage = {
          senderId: socket.user.sportizenId,
          message: message.message,
        };

        await Chat.updateOne(
          { sportizenId: message.receiverId },
          { $push: { chats: chatMessage } },
          { upsert: true }
        );

        const replyMessageEvent = {
          receiverId: socket.user.sportizenId,
          msg: {
            text: message.message,
            date: Date.now(),
            reply: false,
            user: {
              name: socket.user.name,
            },
          },
        };
        const receiver = ChatSockets.getSocket(message.receiverId);
        if (receiver) {
          receiver.emit('message', replyMessageEvent);
        }
        replyMessageEvent.receiverId = message.receiverId;
        replyMessageEvent.msg.reply = true;
        socket.emit('message', replyMessageEvent);
      });

      socket.on('disconnect', () => {
        ChatSockets.deleteSocket(socket.user.sportizenId);
      });
    });
};

module.exports = chatting;
