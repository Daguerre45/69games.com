var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chats', { title: 'CHATS', user: req.session.user.username});
});

// En el lado del servidor (en la definición de la ruta)

router.get('/:usuario', function(req, res, next) {
  const usuarioSeleccionado = req.params.usuario;
  // Lógica para cargar el historial de mensajes y renderizar la página
});

module.exports = router;