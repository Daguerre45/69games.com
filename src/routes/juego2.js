var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SpaceInvaders = require('../database/models/spaceInvaders.model');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('juego2', { title: 'JUEGO2' });
});

// Route to render the player image
router.get('/playerImage', async function(req, res, next) {
  try {
    console.log('Before findOne');
    const playerData = await SpaceInvaders.findOne({ user: req.session.user });
    console.log('After findOne');

    if (playerData && playerData.data) {
      res.contentType(playerData.contentType);
      res.send(playerData.data.buffer);
    } else {
      console.log('Before sendFile');
      const defaultImagePath = path.join(__dirname, '..','public', 'images', 'spaceship.png');
      res.sendFile(defaultImagePath);
      console.log('After sendFile');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
