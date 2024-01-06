// routes/buscarUsuarios.js
const express = require('express');
const router = express.Router();
const User = require('../database/models/user.model');

router.get('/', async (req, res) => {
  try {
    const query = req.query.query;
    const usuariosEncontrados = await User.find({ username: { $regex: query, $options: 'i' } }, 'username');
    res.json(usuariosEncontrados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la búsqueda de usuarios.' });
  }
});

module.exports = router;
