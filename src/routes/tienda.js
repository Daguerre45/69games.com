var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var User = require('../database/models/user.model'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tienda', { title: 'TIENDA', user: req.session.user, username: req.session.user.username });
});

// Update player image
router.post('/updatePlayerImage', async (req, res) => {
  try {
    const { user, image } = req.body;

    // Obtén el usuario de la base de datos
    const existingUser = await User.findOne({ username: user });

    if (!existingUser) {
      // Maneja el caso en el que el usuario no se encuentra
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verifica si el usuario tiene suficientes monedas para comprar la nave
    const precioNave = 50; // Precio de la nave
    const monedasUsuario = existingUser.coins; // Asume que tienes un campo 'monedas' en tu objeto de usuario

    if (monedasUsuario >= precioNave) {
      // Resta las monedas del usuario y actualiza la imagen del jugador
      const updatedUser = await User.findOneAndUpdate(
        { username: user, coins: { $gte: precioNave } }, // Verifica si hay suficientes monedas
        { $inc: { coins: -precioNave }, route: image }, // Resta el precio de la nave
        { new: true } // Devuelve el documento actualizado
      );

      if (!updatedUser) {
        // Maneja el caso en que la actualización falla (por ejemplo, si alguien más ha actualizado el usuario al mismo tiempo)
        return res.status(500).json({ error: 'Error interno del servidor al actualizar el usuario' });
      }

      // Respuesta exitosa
      return res.json({ success: true, message: 'Imagen actualizada exitosamente', user: updatedUser });
    } else {
      // Respuesta si no hay suficientes monedas
      return res.status(403).json({ success: false, error: 'No hay suficientes monedas para comprar esta nave.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

module.exports = router;
