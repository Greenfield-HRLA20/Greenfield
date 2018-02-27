const router = require('express').Router();
const controller = require('./controller.js');

/* GET requests to each page */

router.route('/showExplorePage')
.get(controller.showExplorePage)

router.route('/showFeedPage')
.get((req, res) => {
  controller.showFeedPage(req, res);
})

router.route('/showProfilePage')
.get((req, res) => {
  controller.showProfilePage(req, res);
})

router.route('/showSpecificUserPage')
.get((req, res) => {
  controller.showSpecificUserPage(req, res);
})
/* User functionality/interaction routes */
router.route('/submitPost')
.post((req, res) => {
  controller.submitPost(req, res);
});

router.route('/viewPhoto')
.get((req, res) => {
  controller.viewPhoto(req, res);
})

router.route('/toggleLike')
.post((req, res) => {
  controller.toggleLike(req, res);
})

router.route('/addComment')
.post((req, res) => {
  controller.addComment(req, res);
})

router.route('/requestFollow')
.post((req, res) => {
  controller.requestFollow(req, res);
})

router.route('/respondFollow')
.post((req, res) => {
  controller.respondFollow(req, res);
})

// GET login page
// GET signup page
// Login to account
// Signup (create account)
// Logout

module.exports = router;