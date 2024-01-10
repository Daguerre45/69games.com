// routes/chatsUnico.js (correcciones y suposiciones hechas en el código del lado del servidor)

const express = require('express');
const Message = require('../database/models/messages.model');
const router = express.Router();

router.get('/:usuario', async function (req, res, next) {
  const usuarioDestino = req.params.usuario;
  const usuarioActual = req.session.user.username;

  try {
    const mensajesAnteriores = await Message.find({
      $or: [
        { sender: usuarioActual, receiver: usuarioDestino },
        { sender: usuarioDestino, receiver: usuarioActual }
      ]
    }).sort({ timestamp: 1 });

    res.render('chatsUnico', { title: 'CHAT UNICO', usuarioDestino, mensajesAnteriores, usuarioActual});
  } catch (error) {
    console.error('Error al obtener mensajes anteriores:', error);
    next(error);
  }
});


// Removemos la función duplicada 'guardarMensajeEnBD' ya que se define en el archivo del cliente

module.exports = router; // Corrección de sintaxis