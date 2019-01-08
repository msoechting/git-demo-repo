// =======================
// PACKAGES ==============
// =======================
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const app = express();
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

// =======================
// ==== CONFIGURATION ====
// =======================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Allow cross site scripting (reconsider this for serious production)
app.use(require('./cors'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Data accessible in all views
app.locals.baseUrl = config.baseUrl;

if (app.get('env') !== 'production') {
  // use morgan to log HTTP requests to the console
  app.use(morgan('dev'));
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  // todo: render HTML error page if accepts header is set to HTML
  res.json({
    message: err.message,
    error: {},
  });
});

module.exports = app;
