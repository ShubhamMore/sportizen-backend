const newUser = {
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    userType: {
      type: 'enum',
      enum: ['user', 'admin'],
    },
    password: {
      type: 'string',
    },
  },
  required: ['name', 'email', 'userType', 'password'],
  addidtionalProperties: false,
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
