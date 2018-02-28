const Like = require('../models/Like');

module.exports = {
  toggleLike: async (userId, postId) => {
    try {
      const result = await Like.findOrCreate({
        where: {
          userId,
          postId,
        },
      });
      if (result[1]) {
        return result[1];
      }
      await Like.destroy({
        where: { postId: result[0].dataValues.postId },
      });
      return result[1];

      await Like.destroy({
        where: { postId: result[0].dataValues.postId },
      });
      return result[1];
    } catch (err) {
      console.log(err);
    }
  },
};
