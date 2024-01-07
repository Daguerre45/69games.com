var express = require('express');
var router = express.Router();
const User = require('../database/models/feedback.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('feedback', { title: 'FEEDBACK' });
});

module.exports = router;