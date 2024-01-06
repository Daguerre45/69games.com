var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('perfil', { title: 'PERFIL', username: req.session.user.username, correo: req.session.user.email});
});

module.exports = router;