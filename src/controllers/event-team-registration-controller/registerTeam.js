const EventRegisteredTeam = require('../../models/event-model/event-registered-team.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const registerTeam = async (req, res) => {
  try {
    req.body.sportizenUser = req.user.sportizenId;
    const eventTeamRegistration = new EventRegisteredTeam(req.body);

    await eventTeamRegistration.save();

    responseHandler(eventTeamRegistration, 200, res);
  } catch (e) {
    console.log(e);
    errorHandler(e, 400, res);
  }
};

module.exports = registerTeam;
