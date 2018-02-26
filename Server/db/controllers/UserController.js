const User = require('../models/User.js');

module.exports = {
  checkAndOrSaveUser: async (user) => {
    try {
      let result = await User.findOrCreate({where: {handle: user} })
      console.log(result);

      if (result[1]) {
        return result[0];
      } else {
        console.log('that user already exists', result[0]);
        return 'That username already exists'
      }

    } catch(err) {
      console.log('error with checkandorsaveuser', err);
    }
  },

  getUserId: async (username) => {
    try {
      let user = await User.findOne({where: {handle: username}})
      return user.id;
    } catch (err) {
      console.log(err);
    }
  },

  getUsername: async (userId) => {
    try {
      let user = await User.findById(userId)
      return user.dataValues.handle
    } catch (err) {
      console.log(err);
    }
  }
}