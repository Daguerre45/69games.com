var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const perfilRouter = require('./routes/perfil');
const chatsRouter = require('./routes/chats');
const clasificacionRouter = require('./routes/clasificacion');
const tiendaRouter = require('./routes/tienda');
const feedbackRouter = require('./routes/feedback');

const app = express();

app.locals.title = "REGISTER"
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/perfil', perfilRouter);
app.use('/chats', chatsRouter);
app.use('/clasificacion', clasificacionRouter);
app.use('/tienda', tiendaRouter);
app.use('/feedback', feedbackRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
