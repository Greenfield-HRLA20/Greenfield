const Follow = require('../models/Follow');

module.exports = {
  getUsersThatUserIsFollowing: async (usersOwnId) => {
    try {
      let result = await Follow.findAll({
        where: {
          followerId: usersOwnId,
          requestStatus: true
        }
      });
      let usersThatUserIsFollowing = [];
      for (let i = 0; i < result.length; i++) {
        usersThatUserIsFollowing.push(result[i].userId);
      }
      return usersThatUserIsFollowing;
    } catch (err) {
      console.log(err);
      return;
    }
  },

  getUsersFollowingGivenUser: async (usersOwnId) => {
    try {
      let result = await Follow.findAll({
        where: {
          userId: usersOwnId,
          requestStatus: true          
        }
      });
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  },

  createFollowRequest: async (userId, followerId) => {
    try {
      let result = await Follow.create({
        userId: userId,
        followerId: followerId
      });
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  },

  acceptFollowRequest: async (userId, followerId) => {
    try {
      let result = await Follow.update({
        requestStatus: 1
      }, {
        where: {
          userId: userId,
          followerId: followerId
        }
      });
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  },
  
  denyFollowRequest: async (userId, followerId) => {
    try {
      let result = await Follow.destroy({
        where: {
          userId: userId,
          followerId: followerId
        }
      })
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  },
}