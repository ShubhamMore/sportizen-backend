const EventRegisteredTeam = require('../../models/event-model/event-registered-team.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEventTeams = async (req, res) => {
  try {
    const eventTeamRegistrations = await EventRegisteredTeam.aggregate([
      { $match: { event: req.body.event } },
      {
        $lookup: {
          from: 'userprofiles',
          localField: 'sportizenUser',
          foreignField: 'sportizenId',
          as: 'user',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$user', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          user: 0,
        },
      },
      {
        $project: {
          teamName: 1,
          teamMembers: 1,
          name: 1,
          userImageURL: 1,
          email: 1,
          contact: '$phoneNo',
        },
      },
    ]);

    responseHandler(eventTeamRegistrations, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getEventTeams;
