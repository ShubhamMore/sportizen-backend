const User = require('../../models/user-model/user.model');
const UserProfile = require('../../models/user-model/user-profile.model');

const getSportizenId = require('../../functions/getSportizenId');
const Ajv = require('ajv');
const ajv = new Ajv();
const userSchema = require('../../schema/userSchema');
const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');
const noUser = require('../../shared/user.image');

const newUser = async (req, res) => {
  try {
    //Step 1: check if the payload is valid with defined schema types
    const valid = ajv.validate(userSchema.NewUserSchema, req.body);
    if (!valid) {
      throw new Error(ajv.errors[0].message);
    }

    //Step 2: create sportizen Id
    const sportizenId = await getSportizenId(req.body.name);
    req.body.sportizenId = sportizenId;

    //Step 3: Store user in database -> 1. user model 2. user Profile model
    const user = new User(req.body);

    const userProfile = new UserProfile({
      name: user.name,
      email: user.email,
      sportizenId: sportizenId,
      userImage: noUser,
      userImageURL: noUser.secureUrl,
      userProvider: 'SPORTIZEN',
    });

    await user.save();
    await userProfile.save();
    //
    const token = await user.generateAuthToken();

    const data = {
      _id: user._id,
      email: user.email,
      userType: user.userType,
      sportizenId: user.sportizenId,
      token,
      expiresIn: 1800,
    };

    responseHandler(data, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = newUser;
