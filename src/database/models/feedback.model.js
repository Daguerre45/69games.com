const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: { type: String, required: true},
  text: { type: String}
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;