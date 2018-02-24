const Comment = require('../models/Comment');

module.exports = {
  
  // given message, userid, postID
  // add a new comment to comments table
  addComment: (msg, postId, userId, cb) => {
    Comment.create({
      Comment: msg,
      postId: postId,
      userId: userId
    }).then(message => {
      console.log(message);
      cb(message);
    }).catch(err => {
      console.log('ERROR - could not add comment: ' , err);
    })
  },
  
  // given a post ID
  // give all of the comments for that post
  getCommentsByPostId: (id, cb) => {
    Comment.findAll({
      where: {
        postId: id
      }
    }).then(msgs => {
      console.log(msgs);
      return msgs;
    }).catch(err => {
      console.log('ERROR - could not retreive comments: ', err);
    })
  }
}