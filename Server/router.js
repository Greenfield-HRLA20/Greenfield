const router = require('express').Router();
const controller = require('./controller.js');

router.route('/showExplorePage').get(controller.showExplorePage);

router.route('/showFeedPage').get((req, res) => {
  controller.showFeedPage(req, res);
});

router.route('/showProfilePage').get((req, res) => {
  controller.showProfilePage(req, res);
});

router.route('/showSpecificUserPage').get((req, res) => {
  controller.showSpecificUserPage(req, res);
});

router.route('/submitPost').post((req, res) => {
  controller.submitPost(req, res);
});

router.route('/viewPhoto').get((req, res) => {
  controller.viewPhoto(req, res);
});

router.route('/toggleLike').post((req, res) => {
  controller.toggleLike(req, res);
});

router.route('/addComment').post((req, res) => {
  controller.addComment(req, res);
});

router.route('/addUser').post((req, res) => {
  controller.addUser(req, res);
});

router.route('/requestFollow').post((req, res) => {
  controller.requestFollow(req, res);
});

router.route('/respondFollow').post((req, res) => {
  controller.respondFollow(req, res);
});

router.route('/checkFollowRelationship').get((req, res) => {
  controller.checkFollowRelationship(req, res);
});

router.route('/getPendingFollowRequests').get((req, res) => {
  controller.getPendingFollowRequests(req, res);
});

router.route('/updateUsername').put((req, res) => {
  controller.updateUsername(req, res);
});

router.route('/updateProfilePic').put((req, res) => {
  controller.updateProfilePicture(req, res);
});

router.route('/getLikeStatus').get((req, res) => {
  controller.getLikeStatus(req, res);
});

module.exports = router;
