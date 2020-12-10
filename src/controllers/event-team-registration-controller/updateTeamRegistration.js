const EventRegisteredTeam = require('../../models/event-registered-team.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const updateTeamRegistration = async (req, res) => {
  try {
    const eventTeamRegistration = await EventRegisteredTeam.findByIdAndUpdate(
      req.body._id,
      req.body
    );

    if (!eventTeamRegistration) {
      throw new Error('Invalid Team');
    }

    responseHandler(eventTeamRegistration, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = updateTeamRegistration;
