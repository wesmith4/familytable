require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let handlebars = require('express-handlebars');
let cookieSession = require('cookie-session');


// Set up API routes
let authRouter = require('./API/auth');
let usersRouter = require('./API/users');
let secretRouter = require('./API/secret');
let recipesRouter = require('./API/recipes');



// Set up Front End routes
let homeRouter = require('./Frontend/home');


var app = express();

app.root = (...args) => path.join(__dirname, ...args);

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = app.get('env');
}

// Database setup
let Knex = require('knex');
let dbConfig = require(app.root('knexfile'));
let knex = Knex(dbConfig[process.env.NODE_ENV]);

let { Model } = require('objection');
Model.knex(knex);


// Handlebars view engine setup
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'layout'
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(app.root('public')));
console.log('DIRNAME: ', __dirname);


// Cookie session
if (process.env.SECRET) {
  app.set('session-secret', process.env.SECRET);
} else {
  app.set('session-secret', 'f3quq4930fdsi');
}

let sessionHandler = cookieSession({
  name: 'session',
  secret: app.get('session-secret')
});
app.use(sessionHandler);


let getUser = require('./getUser');
app.use(getUser);

/* // Back end routes
app.use('/users', usersRouter);
app.use('/secret', secretRouter);
app.use('/recipes', recipesRouter);

// Front end routes
app.use('/', homeRouter);
app.use('/auth', authRouter); */
let router = require('./routes');
app.use('/', router);


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
