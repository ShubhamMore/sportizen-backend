const SportList = require('../../models/sports-list.model');

const getSportList = async (req, res) => {
  try {
    const sportList = await SportList.find({});

    if (sportList.length == 0) {
      var successResponse = {
        code: 1,
        success: true,
        message: 'Sportlist is empty',
        data: sportList,
      };
    }
    // succesHandler(successResponse,res)
    res.send(sportList);
  } catch (error) {
    res.send(error);
  }
};
