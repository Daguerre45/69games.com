var createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const http = require('http');
const socketIO = require('socket.io');


const indexRouter = require('./routes/index');
const perfilRouter = require('./routes/perfil');
const chatsRouter = require('./routes/chats');
const chatsUnicoRouter = require('./routes/chatsUnico');
const clasificacionRouter = require('./routes/clasificacion');
const tiendaRouter = require('./routes/tienda');
const feedbackRouter = require('./routes/feedback');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const buscarUsuariosRouter = require('./routes/buscarUsuarios');
const juegoRouter = require('./routes/juego');
const juego2Router = require('./routes/juego2');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const mongoURI = 'mongodb+srv://niggle1510:95l5RR42aV5tgBNf@cluster0.em9jipn.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

app.locals.title = "REGISTER";

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });

  socket.on('mensaje', async (mensaje) => {
    agregarMensaje(mensaje);

    // Guardar mensaje en la base de datos
    await guardarMensajeEnBD({
      sender: socket.id, // Cambiar a tu lógica de manejo de usuarios
      receiver: mensaje.receiver,
      content: mensaje.content,
    });

    // Propagar el mensaje a todos los clientes conectados
    io.emit('mensaje', mensaje);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'tu_secreto', 
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use('/index', indexRouter);
app.use('/perfil', perfilRouter);
app.use('/chats', chatsRouter);
app.use('/chatsUnico', chatsUnicoRouter);
app.use('/clasificacion', clasificacionRouter);
app.use('/tienda', tiendaRouter);
app.use('/feedback', feedbackRouter);
app.use('/', loginRouter);
app.use('/register', registerRouter);
app.use('/buscarUsuarios', buscarUsuariosRouter);
app.use('/juego',juegoRouter);
app.use('/juego2',juego2Router);

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
