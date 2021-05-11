const EventRegisteredTeam = require('../../models/event-model/event-registered-team.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const registerTeam = async (req, res) => {
  try {
    req.body.sportizenUser = req.user.sportizenId;

    const eventTeamRegistration = await EventRegisteredTeam.findOne({
      event: req.body.event,
      sportizenUser: req.user.sportizenUser,
    });

    if (eventTeamRegistration) {
      throw new Error('Already Registered to this Event');
    }

    const newEventTeamRegistration = new EventRegisteredTeam(req.body);

    await newEventTeamRegistration.save();

    responseHandler(newEventTeamRegistration, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = registerTeam;
