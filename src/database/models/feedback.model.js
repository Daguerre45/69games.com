const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: { type: String, required: true},
  text: { type: String}
});

const Feedback = mongoose.model('Feedback', messageSchema);

module.exports = Feedback;