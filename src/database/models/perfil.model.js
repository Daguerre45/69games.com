const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  filename: String,
  data: Buffer,
  contentType: String
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
