// routes/chatsUnico.js

const express = require('express');
const router = express.Router();
const Message = require('../database/models/messages.model');

router.get('/:usuario', async function(req, res, next) {
  const usuarioDestino = req.params.usuario;
  const usuarioActual = req.session.user.username;


  // Retrieve messages from the database
  try {
    const mensajesAnteriores = await Message.find({
      $or: [
        { sender: usuarioActual, receiver: usuarioDestino },
        { sender: usuarioDestino, receiver: usuarioActual }
      ]
    }).sort({ timestamp: 1 }); // Sort by ascending timestamp

    res.render('chatsUnico', { title: 'CHAT UNICO', usuarioDestino, mensajesAnteriores });
  } catch (error) {
    console.error('Error al obtener mensajes anteriores:', error);
    next(error);
  }
});

router.post('/:usuario', async function(req, res, next) {
  const usuarioDestino = req.params.usuario;
  const usuarioActual = req.session.user.username;
  const mensajeContenido = req.body.mensaje;

  // Save the message to the database first
  try {
    const nuevoMensaje = new Message({
      sender: usuarioActual,
      receiver: usuarioDestino,
      content: mensajeContenido
    });

    await nuevoMensaje.save();

    // Emit the message to the chat after saving it to the database
    io.emit('mensaje', mensajeContenido);

    res.status(200).json({ message: 'Mensaje guardado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
});


module.exports = router;

