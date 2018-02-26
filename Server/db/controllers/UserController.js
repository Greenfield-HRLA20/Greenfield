const User = require('../models/User.js');

module.exports = {
  checkAndOrSaveUser : (user) => {
    User
    .findOrCreate({where: {handle: user} })
    .spread((user, created) => {
      if (created) {
        console.log('this user was created, check db', user);
        return user;
      } else {
        console.log('that user already exists', user);
        return 'That username already exists'
      }
    }).catch((err) => {
      if (err) {
        console.log('there was an error', err);
        return;
      }
    })
  },

  getUserId: async (username) => {
    try {
      let user = await User.findAll({where: {handle: username}})
      return user.dataValues.id;
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