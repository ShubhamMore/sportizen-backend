const SportList = require('../../models/sports-list.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getSportList = async (req, res) => {
  try {
    const sportList = await SportList.find({});

    if (sportList.length == 0) {
      const successResponse = {
        code: 1,
        success: true,
        message: 'Sport List is empty',
        data: sportList,
      };
    }

    responseHandler(sportList, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getSportList;
