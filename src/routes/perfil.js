const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Store the image in memory

const Image = require('../database/models/perfil.model');

router.get('/', async (req, res) => {
  // Retrieve the user's profile image from the database
  const user = req.session.user; // Replace with the actual user's username
  const image = await Image.findOne({ user });

  // Render the profile page with the image source
  res.render('perfil', { title: 'PERFIL', user: req.session.user.username, correo: req.session.user.email, imageSrc: image ? `data:${image.contentType};base64,${image.data.toString('base64')}` : "../../images/profile_default.jpg" });
});

router.post('/upload', upload.single('image'), async (req, res) => {
  // Handle the image upload
  const user = req.session.user; // Replace with the actual user's username

  const newImage = new Image({
    user:user,
    filename: req.file.originalname,
    data: req.file.buffer,
    contentType: req.file.mimetype
  });

  await newImage.save();

  // Redirect to the profile page after the upload is complete
  res.redirect('/perfil');
});

module.exports = router;
