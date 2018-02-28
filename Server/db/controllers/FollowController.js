const Follow = require('../models/Follow');

module.exports = {
  getUsersThatUserIsFollowing: async (usersOwnId) => {
    try {
      const result = await Follow.findAll({
        where: {
          userId: usersOwnId,
          requestStatus: true,
        },
      });
      const usersThatUserIsFollowing = [];
      for (let i = 0; i < result.length; i++) {
        usersThatUserIsFollowing.push(result[i].targetId);
      }
      return usersThatUserIsFollowing;
    } catch (err) {
      console.log(err);
    }
  },

  getUsersFollowingGivenUser: async (usersOwnId) => {
    try {
      const result = await Follow.findAll({
        where: {
          targetId: usersOwnId,
          requestStatus: true,
        },
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  },

  createFollowRequest: async (userId, targetId) => {
    try {
      const result = await Follow.create({
        userId,
        targetId,
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  },

  acceptFollowRequest: async (userId, targetId) => {
    try {
      const result = await Follow.update(
        {
          requestStatus: true,
        },
        {
          where: {
            userId,
            targetId,
          },
        },
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  },

  denyFollowRequest: async (userId, targetId) => {
    try {
      const result = await Follow.destroy({
        where: {
          userId,
          targetId,
        },
      });
      return;
    } catch (err) {
      console.log(err);
    }
  },

  checkFollowRelationship: async (userId, targetId) => {
    try {
      const result = await Follow.findAll({
        where: {
          userId,
          targetId,
        },
      });
      return result.length > 0;
    } catch (err) {
      console.log(err);
    }
  },

  getPendingFollowRequests: async (userId) => {
    try {
      const result = await Follow.findAll({
        where: {
          targetId: userId,
          requestStatus: false,
        },
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  },
};
