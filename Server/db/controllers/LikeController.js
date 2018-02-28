const Like = require('../models/Like');

module.exports = {
  toggleLike: async (userId, postId) => {
    try {
      let result = await Like.findOrCreate({
        where: {
          userId: userId,
          postId: postId
        }
      });
      if (result[1]) {
        return result[1];
      } else {
        await Like.destroy({
          where: { postId: result[0].dataValues.postId }
        });
        return result[1];
      }
    } catch (err) {
      console.log(err);
    }
  }
};
