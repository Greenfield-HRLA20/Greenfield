const connection = require('../../controller');

const Comment = connection.define('comment', {
  message: Sequelize.STRING,
});

module.exports = Comment;