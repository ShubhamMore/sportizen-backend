const searchUser = {
  properties: {
    searchName: {
      type: 'string',
    },
  },
  required: ['searchName'],
};

const changeUserConnection = {
  properties: {
    followedUser: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['Requested', 'Rejected', 'Blocked', 'Following'],
    },
  },
  required: ['followedUser', 'status'],
};

const sendConnectionRequest = {
  properties: {
    followedUser: {
      type: 'string',
    },
  },
  required: ['followedUser'],
};

module.exports = {
  searchUser,
  changeUserConnection,
  sendConnectionRequest,
};
