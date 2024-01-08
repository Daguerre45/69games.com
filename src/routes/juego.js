// routes/game.js
const express = require('express');
const router = express.Router();
const User = require('../database/models/user.model');

router.use(express.json());

router.get('/', function(req, res, next) {
  res.render('juego', { title: 'JUEGO' });
});

router.post('/gameover', async function(req, res, next) {
  try {
    const userId = req.session.user._id;
    const newScore = req.body.score;

    const user = await User.findById(userId);

    if (!user.points || newScore > user.points) {
      user.points = newScore;
      await user.save();
    }

    res.json({ success: true, message: 'Puntuación actualizada con éxito' });
  } catch (error) {
    console.error('Error updating user score:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar la puntuación' });
  }
});

module.exports = router;
