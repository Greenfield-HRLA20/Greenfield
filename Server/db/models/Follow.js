const connection = require('../index.js');
const Sequelize = require('sequelize');
const User = require('./User');

const Follow = connection.define('follow', {
  requestStatus: Sequelize.BOOLEAN
});

// associations
Follow.belongsTo(User, { foreignKey: { allowNull: false, name: 'followerId' }, onDelete: 'CASCADE' });

module.exports = Follow;
