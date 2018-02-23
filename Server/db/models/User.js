const connection = require('../../controller');

const User = connection.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  handle: {
    type: Sequelize.STRING,
    unique: true
  },
});

User.hasMany(Post);

module.exports = User;