const Post = require('../models/Post');

module.exports = {
  getUsersPosts: (userId) => {
    Post.findAll({
      where: {
        userId: userId
      }
    })
    .then(posts => {
      return posts;
    })
    .catch(err => {
      console.log("Error accessing user's posts");
    });
  },

  addPost: (caption, postUrl, userId, cb) => {
    Post.create({
      caption: caption,
      url: postUrl,
      userId: userId
    })
    .then(post => {
      console.log('Post successfully added');
      cb(post);
    })
    .catch(err => {
      console.log(err);
      return;
    })
  },

  modifyLikes: (postId, shouldIncrementLikes) => {
    if (shouldIncrementLikes) {
      Post.findById(postId)
      .then(post => {
        post.update({
          likeCount: sequelize.literal('likecount + 1')
        })
      })
      .catch(err => {
        console.log(err);
        return;
      })
    } else {
      Post.findById(postId)
      .then(post => {
        post.update({
          likeCount: sequelize.literal('likecount - 1')
        })
      })
      .catch(err => {
        console.log(err);
        return;
      })
    }
  }
}