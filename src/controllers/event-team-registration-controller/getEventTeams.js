const EventRegisteredTeam = require('../../models/event-model/event-registered-team.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEventTeams = async (req, res) => {
  try {
    const eventId = req.body.id ? req.body.id : req.params.id;

    const eventTeamRegistrations = await EventRegisteredTeam.aggregate([
      { $match: { event: eventId } },
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

    responseHandler(eventTeamRegistrations, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getEventTeams;
