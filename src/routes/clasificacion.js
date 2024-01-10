const express = require('express');
const router = express.Router();
const User = require('../database/models/user.model');

router.get('/', async function(req, res, next) {
  try {
    // Obtén la lista de usuarios ordenados por puntos de mayor a menor
    const users = await User.find().sort({ points: -1 });

    // Renderiza el archivo EJS y pasa la lista de usuarios como variable
    res.render('clasificacion', { users, user: req.session.user.username});
  } catch (error) {
    console.error('Error al obtener la clasificación:', error);
    next(error);
  }
});

module.exports = router;
