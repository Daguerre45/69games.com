var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('juego2', { title: 'JUEGO2' });
});

module.exports = router;