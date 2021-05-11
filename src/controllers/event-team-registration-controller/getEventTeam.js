const EventRegisteredTeam = require('../../models/event-model/event-registered-team.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEventTeam = async (req, res) => {
  try {
    const eventTeamRegistration = await EventRegisteredTeam.findById(req.body.id);

    if (!eventTeamRegistration) {
      throw new Error('Invalid Team');
    }

    responseHandler(eventTeamRegistration, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getEventTeam;
