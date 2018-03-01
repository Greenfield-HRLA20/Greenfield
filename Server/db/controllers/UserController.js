const User = require('../models/User.js');

module.exports = {
  checkAndOrSaveUser: async (username, userId) => {
    try {
      const result = await User.findOrCreate({
        where: { handle: username, uid: userId },
      });
      if (result[1]) {
        return result[0];
      }
      return 'That username already exists';
    } catch (err) {
      console.log('error with checkandorsaveuser', err);
    }
  },

  getUserId: async (uid) => {
    try {
      const user = await User.findOne({ where: { uid } });
      return user.id;
    } catch (err) {
      console.log(err);
    }
  },

  getUsername: async (userId) => {
    try {
      const user = await User.findById(userId);
      return user.dataValues.handle;
    } catch (err) {
      console.log(err);
    }
  },

  getUid: async (userId) => {
    try {
      const user = await User.findById(userId);
      return user.dataValues.uid;
    } catch (err) {
      console.log(err);
    }
  },

  updateUsername: async (username, uid) => {
    try {
      const user = await User.findOne({ where: { uid } });
      user.update({
        handle: username,
      });
    } catch (err) {
      console.log('Error updating username ', err);
    }
  },
};
