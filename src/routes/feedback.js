var express = require('express');
var router = express.Router();
const Feedback = require('../database/models/feedback.model');

router.get('/', function(req, res, next) {
  res.render('feedback', { title: 'FEEDBACK' });
});

router.post('/feedback', async function(req, res, next) {
  const user = req.session.user.username
  const feedback = req.body.input-feedback

  
  const newFeedback = new Feedback({user, feedback})
  await newFeedback.save();

  console.log('Feedback enviado de usuario: ', user);
  res.redirect('/feedback'); 

});
module.exports = router;