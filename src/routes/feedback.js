var express = require('express');
var router = express.Router();
const Feedback = require('../database/models/feedback.model');

router.get('/', function(req, res, next) {
  res.render('feedback', { title: 'FEEDBACK', user: req.session.user.username });
});


router.post('/', async function(req, res, next) {
  let user = req.session.user.username
  let feedback = req.body.feedback

  
  let newFeedback = new Feedback({user: user, text: feedback})
  await newFeedback.save();

  console.log('Feedback enviado de usuario: ', user);
  console.log('Feedback: ', feedback);
  res.redirect('/feedback');

});
module.exports = router;