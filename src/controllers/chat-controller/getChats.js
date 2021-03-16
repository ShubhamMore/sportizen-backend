const Chat = require('./../../models/chat-model/chat.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getChats = async (req, res) => {
  try {
    const chats = await Chat.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [{ senderId: req.user.sportizenId }, { receiverId: req.body.receiverId }],
            },
            {
              $and: [{ senderId: req.body.receiverId }, { receiverId: req.user.sportizenId }],
            },
          ],
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    responseHandler(chats, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getChats;
