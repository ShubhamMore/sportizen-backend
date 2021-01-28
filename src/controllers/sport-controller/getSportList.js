const SportList = require('../../models/sport-model/sport.model');

const getSportList = async (req, res) => {
  try {
    const sportList = await SportList.find({});

    if (sportList.length == 0) {
      let successResponse = {
        code: 1,
        success: true,
        message: 'Sport list is empty',
        data: sportList,
      };
    }
    // succesHandler(successResponse,res)
    res.send(sportList);
  } catch (error) {
    res.send(error);
  }
};
