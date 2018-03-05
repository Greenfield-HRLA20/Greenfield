const Comment = require('../models/Comment');
const UserController = require('./UserController');

module.exports = { 
  addComment: async (msg, postId, userId) => {
    try {
      const result = await Comment.create({
        Comment: msg,
        postId,
        userId,
      });
      return result;
    } catch (err) {
      console.log('ERROR - could not add comment: ', err);
    }
  },

  getCommentsByPostId: async (id) => {
    try {
      const result = await Comment.findAll({
        where: { postId: id },
        order: [['createdAt', 'ASC']],
      });
      const filtered = [];
      for (let i = 0; i < result.length; i++) {
        filtered.push([
          await UserController.getUsername(result[i].userId),
          await UserController.getUid(result[i].userId),
          await UserController.getProfilePic(result[i].userId),
          result[i].Comment,
        ]);
      }
      return filtered;
    } catch (err) {
      console.log(err);
    }
  },
};
