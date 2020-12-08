const Event = require('../../models/event.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.aggregate([{
      $match: {
      },
    },
    {
      $addFields: {
        event: {$toString: '$_id'}
      }
    },
    {
      $lookup: {
        from: 'eventregisteredplayers',
        let: {eventId: '$event'},
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$event', '$$eventId']
                  },
                  {
                    $eq:['$sportizenUser', req.user.sportizenId]
                  }
                ]
              }
            }
          }
        ],
        as: 'players'
      },
    },
    {
      $lookup: {
        from: 'eventregisteredteams',
        let: {eventId: '$event'},
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$event', '$$eventId']
                  },
                  {
                    $eq:['$sportizenUser', req.user.sportizenId]
                  }
                ]
              }
            }
          }
        ],
        as: 'teams'
      },
    }, 
    {
      $addFields: {
        registered: {$setUnion: ['$players', '$teams']}
      }
    },
    
    {
      $addFields: {
        isRegistered: { $cond: { if:  { $eq: [ 
          '$registered', [] ] }, then: false, else: true } }
      }
    },
    {
      $project: {
        teams: 0,
        players: 0,
        registered: 0,
      }
    }
    ]);

    responseHandler(events, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getAllEvents;
