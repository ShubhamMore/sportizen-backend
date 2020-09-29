const UserConnection = require('../../models/user-connection.model');
const UserProfile = require('../../models/user-profile.model');

const getMyConnections = async (req, res) => {
  try {
    const userConnection = await UserConnection.find({
      $or: [{ firstUser: req.user._id }, { secondUser: req.user._id }],
      status: 'connected',
    });

    const connData = await UserConnection.aggregate([
      {
        $match:{
          $expr:{
            $or:[
              {
                $eq:['$firstUser',req.user._id]
              },{
                $eq:['$secondUser',req.user._id]
              }
            ]
          },
          status:'connected'
        }
      },{
        $addFields:{
          searchUser:{
            $cond:{
              if:{
                $eq:['$firstUser',req.user._id]
              }, 
              then:'$secondUser',
              else:'$firstUser'
            }
          }
        }  
      },{
        $addFields:{
          searchUser:{
            $toObjectId:'$searchUser'
          }
        }
      },{
        $lookup:{
          from:'UserProfile',
          localField:'searchUser',
          foreignField:'_id',
          as:'connectionDetails'
        }
      }
    ])

    if (!userConnection) {
      throw new Error('');
    }
    res.send(connData);
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = getMyConnections;
