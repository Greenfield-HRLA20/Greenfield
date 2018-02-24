const Like = require('../models/Like');

module.exports = {
  toggleLike: (userId, postId, callback) => {
    Like.findOrCreate({
      where: {
        userId: userId, 
        postId: postId
      }
    }).spread((user, created) => {
      if(created) {
        callback(true)
      } else {
        Like.destroy({
          where: {postId: user.postId}
        }).catch((err) => {
          console.log(err);
          return;
        })
        callback(false);
      }
    }).catch((err) => {
      console.log(err);
      return;
    })
  }
}