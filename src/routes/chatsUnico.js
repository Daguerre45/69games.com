var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:usuario', function(req, res, next) {
  const usuarioDestino = req.params.usuario;
  res.render('chatsUnico', { title: 'CHAT UNICO', usuarioDestino });
});

module.exports = router;