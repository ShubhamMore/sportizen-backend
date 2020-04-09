const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

const validateToken = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': req.body.token,
    });

    if (!user) {
      throw new Error('Invalid Token');
    }

    const data = {
      valid_token: true,
    };

    res.status(200).send(data);
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = validateToken;
