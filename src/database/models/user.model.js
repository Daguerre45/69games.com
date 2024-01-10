// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  scoreRG: { type: Number, default: 0 },
  scoreSI: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
