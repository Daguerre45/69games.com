var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SpaceInvaders = require('../database/models/spaceInvaders.model');
var fs = require('fs');
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tienda', { title: 'TIENDA' });
});

// Update player image
router.post('/updatePlayerImage', async function(req, res, next) {
  try {
    const { user } = req.session.user; // Assuming you have user information in the session
    const { imagePath } = req.body;

    // Check if there's an existing record for the user
    const existingRecord = await SpaceInvaders.findOne({ user });

    // If no existing record, create a new one
    if (!existingRecord) {
      const imageBuffer = fs.readFileSync(path.join(__dirname, '..', 'public','images', imagePath));
      const contentType = 'image/png'; // Change accordingly

      const newRecord = new SpaceInvaders({
        user,
        filename: path.basename(imagePath),
        data: imageBuffer,
        contentType,
      });

      await newRecord.save();
      res.json({ success: true, message: 'Image added to the database.' });
    } else {
      // If an existing record, update the image
      existingRecord.filename = path.basename(imagePath);
      existingRecord.data = fs.readFileSync(path.join(__dirname, '..', 'public','images', imagePath));
      existingRecord.contentType = 'image/png'; // Change accordingly

      await existingRecord.save();
      res.json({ success: true, message: 'Image updated in the database.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;