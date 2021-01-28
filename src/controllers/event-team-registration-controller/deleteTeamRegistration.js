const EventRegisteredTeam = require('../../models/event-model/event-registered-team.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteTeamRegistration = async (req, res) => {
  try {
    const eventTeamRegistration = await EventRegisteredTeam.findByIdAndDelete(req.body.id);

    if (!eventTeamRegistration) {
      throw new Error('Invalid Team');
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteTeamRegistration;
