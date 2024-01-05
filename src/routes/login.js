// routes/login.js
const express = require('express');
const router = express.Router();
const User = require('../database/models/user.model');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'SW1' });
});

router.post('/', async function(req, res, next) {
  const { username, password } = req.body;

  // Buscar al usuario en la base de datos
  const user = await User.findOne({ username, password });

  if (!user) {
    return res.render('login', { title: 'SW1', errorMessage: 'Nombre de usuario o contraseña incorrectos' });
  }

  console.log('Usuario autenticado:', user);
  res.redirect('/'); // Cambia esto según la ruta deseada después del inicio de sesión
});

module.exports = router;
