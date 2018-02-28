const Follow = require('../models/Follow');

module.exports = {
  getUsersThatUserIsFollowing: async usersOwnId => {
    try {
      let result = await Follow.findAll({
        where: {
          userId: usersOwnId,
          requestStatus: true
        }
      });
      let usersThatUserIsFollowing = [];
      for (let i = 0; i < result.length; i++) {
        usersThatUserIsFollowing.push(result[i].targetId);
      }
      return usersThatUserIsFollowing;
    } catch (err) {
      console.log(err);
      return;
    }
  },

  getUsersFollowingGivenUser: async usersOwnId => {
    try {
      let result = await Follow.findAll({
        where: {
          targetId: usersOwnId,
          requestStatus: true
        }
      });
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  },

  createFollowRequest: async (userId, targetId) => {
    try {
      let result = await Follow.create({
        userId: userId,
        targetId: targetId
      });
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  },

  acceptFollowRequest: async (userId, targetId) => {
    try {
      let result = await Follow.update(
        {
          requestStatus: true
        },
        {
          where: {
            userId: userId,
            targetId: targetId
          }
        }
      );
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  },

  denyFollowRequest: async (userId, targetId) => {
    try {
      let result = await Follow.destroy({
        where: {
          userId: userId,
          targetId: targetId
        }
      });
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  },

  checkFollowRelationship: async (userId, targetId) => {
    try {
      let result = await Follow.findAll({
        where: {
          userId: userId,
          targetId: targetId
        }
      });
      return result.length > 0 ? true : false;
    } catch (err) {
      console.log(err);
      return;
    }
  },

  getPendingFollowRequests: async userId => {
    try {
      let result = await Follow.findAll({
        where: {
          targetId: userId,
          requestStatus: false
        }
      });
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }
};
