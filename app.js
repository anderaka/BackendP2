var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var cors = require('cors');


// Conectar con la base de datos de mongo

require('./lib/connectMongo');

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.locals.title = 'AnunPractice';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/api/anuncios', require('./routes/api/anuncios'));

app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));

// handler de error 404

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
    
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render para pagina de error
  
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
