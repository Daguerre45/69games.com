const express = require('express');
const router = express.Router();
const User = require('../database/models/user.model');
const Image = require('../database/models/perfil.model');
const mongoose = require('mongoose');

router.get('/', async function (req, res, next) {
  try {
    // Obtén la lista de usuarios ordenados por puntos RG de mayor a menor
    const usersRG = await User.find().sort({ scoreRG: -1 });

    // Obtén la lista de usuarios ordenados por puntos SI de mayor a menor
    const usersSI = await User.find().sort({ scoreSI: -1 });

    // Convert usernames to ObjectId
    const userIdsRG = usersRG.map(user => user._id);
    const userIdsSI = usersSI.map(user => user._id);


    // Fetch profile images for each user
    const profileImages = await Image.find({
      user: { $in: [...userIdsRG, ...userIdsSI].map(id => id.toString()) }
    });

    // Create a map of user ID to profile image.
    const profileImageMap = {};
    profileImages.forEach(image => {
      profileImageMap[image.user] = image; // Assuming 'user' is a string here
    });


    // Render the template
    res.render('Clasificacion', {
      title: "Clasificacion",
      usersRG,
      usersSI,
      profileImageMap,
      user: req.session.user.username // Ensure req.session.user exists and has a username property
    });
  } catch (error) {
    console.error('Error al obtener la clasificación:', error);
    next(error);
  }
});


module.exports = router;

