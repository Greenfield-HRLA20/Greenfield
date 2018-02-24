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

  getUserId: (username) => {
    User.findAll({where: {handle: username}}).then((user) => {
      console.log('this should be the entire user object', user);
      return user.dataValues.id;
    }).catch((err) => {
      console.log('something went wrong', err);
    });
  }
}