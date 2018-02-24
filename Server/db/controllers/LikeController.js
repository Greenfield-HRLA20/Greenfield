import Like from '../models/Like'
module.exports = {
  checkIfExist: (userId, postId) => {
    Like.findOrCreate({
      userId: userId, 
      postId: postId
    }).spread((user, created) => {
      if(created) {
        return true
      } else {
        Like.destroy({
          where: {postId: user.postId}
        }).catch((err) => {
          console.log(err);
          return;
        })
        return false;
      }
    }).catch((err) => {
      console.log(err);
      return;
    })
  }
}