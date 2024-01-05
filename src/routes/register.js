// routes/register.js
const express = require('express');
const router = express.Router();
const User = require('../database/models/user.model');

router.get('/', function(req, res, next) {
  res.render('register', { title: 'SW1' });
});

router.post('/', async function(req, res, next) {
  const { username, email, password, confirmPassword } = req.body;

  // Verificar si las contraseñas coinciden
  if (password !== confirmPassword) {
    return res.render('register', { title: 'SW1', errorMessage: 'Las contraseñas no coinciden' });
  }

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.render('register', { title: 'SW1', errorMessage: 'El usuario o correo electrónico ya está registrado' });
  }

  // Crear un nuevo usuario
  const newUser = new User({ username, email, password });
  await newUser.save();

  console.log('Usuario registrado:', newUser);
  res.redirect('/'); // Cambia esto según la ruta deseada después del registro
});

module.exports = router;
