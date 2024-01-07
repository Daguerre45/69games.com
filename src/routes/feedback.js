var express = require('express');
var router = express.Router();
const Feedback = require('../database/models/feedback.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('feedback', { title: 'FEEDBACK' });
});

router.post('/', async function(req, res, next) {
  const user = req.session.user
  const feedback = req.body

  // Crear un nuevo usuario
  const newFeedback = new Feedback({user, feedback})
  await newFeedback.save();

  console.log('Feedback enviado de usuario: ', user);
  res.redirect('/feedback'); // Cambia esto según la ruta deseada después del registro
});
module.exports = router;