const connection = require('../index.js');
const Sequelize = require('sequelize');
const User = require('./User');

const Follow = connection.define('follow', {
  targetId: Sequelize.INTEGER,
  requestStatus: { type: Sequelize.BOOLEAN, defaultValue: false }
});

// associations
Follow.belongsTo(User, {
  foreignKey: { allowNull: false, name: 'userId' },
  onDelete: 'CASCADE'
});

module.exports = Follow;
