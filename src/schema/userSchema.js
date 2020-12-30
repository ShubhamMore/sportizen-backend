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

const checkUser = {
  properties: {
    email: {
      type: 'string',
    },
  },
  required: ['email'],
};

const forgotPassword = {
  properties: {
    email: {
      type: 'string',
    },
  },
  required: ['email'],
};

const setPassword = {
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: ['email', 'password'],
};

const changePassword = {
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    newPassword: {
      type: 'string',
    },
  },
  required: ['email'],
};

module.exports = {
  NewUserSchema: newUser,
  LoginSchema: login,
  CheckUserSchema: checkUser,
  ForgotPasswordSchema: forgotPassword,
  SetPasswordSchema: setPassword,
  ChangePasswordSchema: changePassword,
};
