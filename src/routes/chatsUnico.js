var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chatsUnico', { title: 'CHAT UNICO' });
});

module.exports = router;