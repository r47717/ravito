const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const debug = require('debug');
const csrfMiddleware = require('csurf')({ cookie: true });
const fileUpload = require('express-fileupload');

const passport = require('./lib/passport');
const postRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const seedRouter = require('./routes/seed');

const app = express();

app.use(logger('dev'));

app.use(fileUpload({
  createParentPath: true,
  debug: true,
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'sdf09s8df098asd09876A0F987SDF',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.authenticated = !!req.user; // to use 'authenticated' flag in templates
  next();
});
// app.use(csrfMiddleware);

app.use('/', postRouter);
app.use('/', csrfMiddleware, usersRouter);
app.use('/', csrfMiddleware, authRouter);
app.use('/seeder', csrfMiddleware, seedRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
