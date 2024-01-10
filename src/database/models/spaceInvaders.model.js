const mongoose = require('mongoose');

const spaceInvadersSchema = new mongoose.Schema({
  user: { type: String, required: true },
  filename: String,
  data: Buffer,
  contentType: String
});

const SpaceInvaders = mongoose.model('SpaceInvaders', spaceInvadersSchema);

module.exports = SpaceInvaders;
