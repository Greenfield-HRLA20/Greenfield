const Post = require('../models/Post');
const Sequelize = require('sequelize');

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

  addPost: (caption, postUrl, userID) => {
    Post.create({
      caption: caption,
      url: postUrl,
      userId: userId
    })
    .then(post => {
      console.log('Post successfully added');
      return post;
    })
    .catch(err => {
      console.log(err);
      return;
    })
  },

  modifyLikes: (postId, shouldIncrementLikes) => {
    console.log('in the modify likes function');
    if (shouldIncrementLikes) {
      Post.findById(postId)
      .then(post => {
        post.update({
          likeCount: Sequelize.literal('likecount + 1')
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
          likeCount: Sequelize.literal('likecount - 1')
        })
      })
      .catch(err => {
        console.log(err);
        return;
      })
    }
  }
}