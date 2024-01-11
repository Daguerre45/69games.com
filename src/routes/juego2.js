// routes/game2.js
const express = require('express');
const router = express.Router();
var path = require('path');
const User = require('../database/models/user.model');

router.use(express.json());

router.get('/', function(req, res, next) {
  res.render('juego2', { title: 'JUEGO2', user: req.session.user.username});
});

router.post('/gameover', async function(req, res, next) {
  try {
    const userId = req.session.user._id;
    const newScore = req.body.score;

    const user = await User.findById(userId);

    if (!user.scoreSI || newScore > user.scoreSI) {
      user.scoreSI = newScore;
      user.coins = user.coins + newScore;
      await user.save();
    }

    res.json({ success: true, message: 'Puntuación actualizada con éxito' });
  } catch (error) {
    console.error('Error updating user score:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar la puntuación' });
  }
});

router.get('/playerImage', async function(req, res, next) {
  try {
    const { user } = req.session; // Assuming you have user information in the session

    console.log('Before findOne');
    const playerData = await User.findOne({ username: user.username });
    console.log('After findOne');

    if (playerData && playerData.route) {
      res.sendFile(path.join(__dirname, '..', 'public', playerData.route));
    } else {
      console.error('Player data not found or missing route information');
      res.status(404).send('Not Found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
