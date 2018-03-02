const Comment = require('../models/Comment');
const UserController = require('./UserController');

module.exports = {
  // given message, userid, postID
  // add a new comment to comments table
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

  // given a post ID
  // give all of the comments for that post
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
