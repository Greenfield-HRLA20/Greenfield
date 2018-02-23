const connection = require('../../controller');

const Post = connection.define('post', {
  caption: Sequelize.STRING,
  url: Sequelize.STRING,
  createdAt: Sequelize.DATE,
});

Post.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

module.exports = Post;