const UserConnection = require('../../models/user-connection.model');

const getMyConnections = async (req, res) => {
  try {
    // const userConnection = await UserConnection.find({
    //   $or: [{ firstUser: req.user._id }, { secondUser: req.user._id }],
    //   status: 'connected',
    // });

    // const connData = await UserConnection.aggregate([
    //   {
    //     $match:{
    //       $expr:{
    //         $or:[
    //           {
    //             $eq:['$firstUser',req.user._id]
    //           },{
    //             $eq:['$secondUser',req.user._id]
    //           }
    //         ]
    //       },
    //       status:'connected'
    //     }
    //   },{
    //     $addFields:{
    //       searchUser:{
    //         $cond:{
    //           if:{
    //             $eq:['$firstUser',req.user._id]
    //           },
    //           then:'$secondUser',
    //           else:'$firstUser'
    //         }
    //       }
    //     }
    //   },{
    //     $addFields:{
    //       searchUser:{
    //         $toObjectId:'$searchUser'
    //       }
    //     }
    //   },{
    //     $lookup:{
    //       from:'UserProfile',
    //       localField:'searchUser',
    //       foreignField:'_id',
    //       as:'connectionDetails'
    //     }
    //   }
    // ])

    const connData = await UserConnection.aggregate([
      {
        $match: {
          $expr: {
            $or: [
              {
                $eq: ['$firstUser', req.user.email],
              },
              {
                $eq: ['$secondUser', req.user.email],
              },
            ],
          },
          status: 'connected',
        },
      },
      {
        $addFields: {
          searchUser: {
            $cond: {
              if: {
                $eq: ['$firstUser', req.user.email],
              },
              then: '$secondUser',
              else: '$firstUser',
            },
          },
        },
      },
      {
        $lookup: {
          from: 'userprofiles',
          localField: 'searchUser',
          foreignField: 'email',
          as: 'connectionDetails',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$connectionDetails', 0] }, '$$ROOT'] },
        },
      },
      { $project: { connectionDetails: 0 } },
      { $project: { _id: 1, email: 1, name: 1, userImageURL: 1, userCoverImageURL: 1 } },
    ]);

    res.send(connData);
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = getMyConnections;
