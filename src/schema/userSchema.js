const newUser = {
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    userType: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};

const login = {
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};

module.exports = {
  NewUserSchema: newUser,
  LoginSchema: login,
};
