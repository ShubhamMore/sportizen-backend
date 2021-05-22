const Socket = require('./../socket');
const UserConnection = require('./../../models/user-connection-model/user-connection.model');

const emitOnlineStatus = async (sportizenId, isOnline) => {
  try {
    const connections = await UserConnection.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [{ primaryUser: sportizenId }, { status: 'following' }],
            },
            {
              $and: [{ followedUser: sportizenId }, { status: 'following' }],
            },
          ],
        },
      },
      {
        $addFields: {
          connection: {
            $cond: {
              if: { $eq: ['$primaryUser', sportizenId] },
              then: '$followedUser',
              else: '$primaryUser',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          connection: 1,
        },
      },
    ]);

    for (let connection of connections) {
      const receiver = Socket.getSocket(connection);
      console.log(receiver);
      if (receiver) {
        receiver.emit('isOnline', { sportizenId, isOnline });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = emitOnlineStatus;
