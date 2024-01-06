// routes/chatsUnico.js

const express = require('express');
const router = express.Router();
const Message = require('../database//models/message.model'); // Asegúrate de la ruta correcta

router.get('/:usuario', async function(req, res, next) {
  const usuarioDestino = req.params.usuario;
  const usuairoActual = req.session.user.username;

  // Obtener mensajes anteriores desde la base de datos
  try {
    const mensajesAnteriores = await Message.find({
      $or: [
        { sender: usuairoActual, receiver: usuarioDestino },
        { sender: usuarioDestino, receiver: 'UsuarioActual' }
      ]
    }).sort({ timestamp: 1 }); // Ordenar por fecha ascendente

    res.render('chatsUnico', { title: 'CHAT UNICO', usuarioDestino, mensajesAnteriores });
  } catch (error) {
    console.error('Error al obtener mensajes anteriores:', error);
    next(error);
  }
});

module.exports = router;
