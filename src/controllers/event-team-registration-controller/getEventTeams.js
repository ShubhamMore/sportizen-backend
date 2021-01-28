const EventRegisteredTeam = require('../../models/event-model/event-registered-team.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEventTeams = async (req, res) => {
  try {
    const eventTeamRegistrations = await EventRegisteredTeam.find({ event: req.body.event });

    responseHandler(eventTeamRegistrations, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getEventTeams;
