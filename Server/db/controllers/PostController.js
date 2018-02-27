const Post = require('../models/Post');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  getAllPosts: async () => {
    try {
      let result = await Post.findAll({order: [['createdAt', 'DESC']] })
      return result;
    } catch(err) {
      console.log('comment controller err', err)
    }
  },

  getUsersPosts: async (userId) => {
    try {
      let result = await Post.findAll({
        where: {
          userId: userId
        }
      });
      return result;
    } catch(err) {
      console.log("Error accessing user's posts", err);
    }
  },

  getFeedPosts: async (userIds) => {
    try {
      let result = await Post.findAll({
        where: {
          userId: {
            [Op.or]: userIds
          }
        },
        order: [['createdAt', 'DESC']]
      })
      return result;
    } catch (err) {
      console.log('Error accessing feed posts', err);
    }
  },

  submitPost: async (caption, postUrl, userId, mediaType) => {
    try {
      let result = await Post.create({
        caption: caption,
        url: postUrl,
        userId: userId,
        mediaType: mediaType
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  },

  modifyLikes: async (postId, shouldIncrementLikes) => {
    try {
      if (shouldIncrementLikes) {
        let result = await Post.findById(postId)
        result.update({
          likeCount: Sequelize.literal('likecount + 1')
        })
      } else {
        let result = await Post.findById(postId)
        result.update({
          likeCount: Sequelize.literal('likecount - 1')
        })
      }
    } catch (err) {
      console.log("Error modifying results", err);
    }
  }
}