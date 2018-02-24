const Follow = require('../models/Follow');
module.exports = {
  getUsersThatUserIsFollowing: (usersOwnId) => {
    Follow.findAll({
      followerId: usersOwnId
    }).then((results) => {
      return results;
    }).catch((err) => {
      console.log(err);
      return;
    })
  },

  getUsersFollowingGivenUser: (usersOwnId) => {
    Follow.findAll({
      userId: usersOwnId
    }).then((results) => {
      return results;
    }).catch((err) => {
      console.log(err);
      return;
    })
  },

  createFollowRequest: (userId, followerId) => {
    Follow.create({
      userId: userId,
      followerId: followerId
    }).then((result) => {
      return result;
    }).catch((err) => {
      console.log(err);
      return;
    })
  },
  acceptFollowRequest: (userId, followerId) => {
    Follow.update({
      requestStatus: 1
    }, {
      where: {
        userId: userId,
        followerId: followerId
      }
    }).catch((err) => {
      console.log(err);
      return;
    })
  },
  denyFollowRequest: (userId, followerId) => {
    Follow.destroy({
      where: {
        userId: userId,
        followerId: followerId
      }
    }).catch((err) => {
      console.log(err);
      return;
    })
  },
}

// given a user ID
  // return everyone that you are following and pending is 1

// requesting
  // given user ID and follower iD
  // create a new record
  // set status to false/0

// ACCEPTING
  // given user ID and follower ID
  // access the record
  // set status to 1

// denying
// given user ID and follower ID
  // access the record
  // delete the record