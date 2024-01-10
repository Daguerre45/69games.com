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

    // Find the user in the database and update the image path
    const updatedUser = await User.findOneAndUpdate(
      { username: user },
      { route: image },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      // Handle the case where the user is not found
      return res.status(404).json({ error: 'User not found' });
    }

    // Send a response with the updated user data (if needed)
    res.json({ message: 'Image updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
