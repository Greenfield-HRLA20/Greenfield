const Comment = require('../models/Comment');

module.exports = {
  
  // given message, userid, postID
  // add a new comment to comments table
  addComment: (msg, postId, userId) => {
    Comment.create({
      message: msg,
      postId: postId,
      userId: userId
    }).then(message => {
      console.log(message);
      return message;
    }).catch(err => {
      console.log('ERROR - could not add comment: ' , err);
    })
  },
  
  // given a post ID
  // give all of the comments for that post
  getCommentsByPostId: async (id) => {
    try {
      let result = await Comment.findAll({where: {postId: id}})
      let filtered = result.map((msg) => [msg.userId, msg.Comment])
      return filtered;
    } catch (err) {
      console.log(err)
    }
  }
}

