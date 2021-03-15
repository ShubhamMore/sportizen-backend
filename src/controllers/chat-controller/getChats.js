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
              $and: [
                { sportizenId: req.user.sportizenId },
                {
                  'chats.senderId': req.body.receiverId,
                },
              ],
            },
            {
              $and: [
                { sportizenId: req.body.receiverId },
                {
                  'chats.senderId': req.user.sportizenId,
                },
              ],
            },
          ],
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    responseHandler(chats, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getChats;
