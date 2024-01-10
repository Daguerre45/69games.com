const express = require('express');
const router = express.Router();
const User = require('../database/models/user.model');

router.get('/', async function(req, res, next) {
  try {
    // Obtén la lista de usuarios ordenados por puntos RG de mayor a menor
    const usersRG = await User.find().sort({ scoreRG: -1 });

    // Obtén la lista de usuarios ordenados por puntos SI de mayor a menor
    const usersSI = await User.find().sort({ scoreSI: -1 });

    // Renderiza el archivo EJS y pasa las listas de usuarios como variables
    res.render('clasificacion', { usersRG, usersSI, user: req.session.user.username });
  } catch (error) {
    console.error('Error al obtener la clasificación:', error);
    next(error);
  }
});

module.exports = router;
