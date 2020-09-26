const UserProfile = require('../../models/user-profile.model');

const searchNewConnections = async (req, res) => {
  try {
    const name = new RegExp('.*' + req.body.searchName + '.*');

    const userConnections = await UserProfile.find({ name });

    res.send(userConnections);
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = searchNewConnections;
