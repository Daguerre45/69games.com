var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '69Games', runnerImageSrc: "/images/runnerGameImage.png", spaceInvadersSrc: "/images/spaceInvadersImage.png", user: req.session.user.username });
});

module.exports = router;