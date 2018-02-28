const User = require('../models/User.js');

module.exports = {
  checkAndOrSaveUser: async (username, userId) => {
    try {
      let result = await User.findOrCreate({
        where: { handle: username, uid: userId }
      });
      if (result[1]) {
        return result[0];
      } else {
        return 'That username already exists';
      }
    } catch (err) {
      console.log('error with checkandorsaveuser', err);
    }
  },

  getUserId: async uid => {
    try {
      let user = await User.findOne({ where: { uid: uid } });
      return user.id;
    } catch (err) {
      console.log(err);
    }
  },

  getUsername: async userId => {
    try {
      let user = await User.findById(userId);
      return user.dataValues.handle;
    } catch (err) {
      console.log(err);
    }
  },

  getUid: async userId => {
    try {
      let user = await User.findById(userId);
      return user.dataValues.uid;
    } catch (err) {
      console.log(err);
    }
  }
};
