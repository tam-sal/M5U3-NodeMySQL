var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ---------------------------- incluir configuracion de dotenv
require('dotenv').config();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var pool = require('./models/db'); //db.js


// -------------------------- SELECT

pool.query('select * from m5u2').then(function(resultados)
 {console.log(resultados)});

// -------------------------- INSERT

var obj = { 
  nombre: 'juan',
  apellido: 'Lopez',
  trabajo: 'docente',
  edad: 38,
  salario: 150000,
  mail: 'juanlop@gmail.com'
}

//pool.query('insert into m5u2 set ?', [obj]).then(function(resultados) 
//{console.log(resultados)});

// ----------------------  UPDATE

var id = 1;
var obj2 = {
  nombre: 'Pablo',
  apellido: 'Gomez'
}
// pool.query('update m5u2 set ? where id_ejm = ?', [obj2, id]).then(function(resultados) 
// {console.log(resultados)})

// -------------------------- DELETE

var id_del = 20
// pool.query('DELETE FROM m5u2 WHERE id_ejm=?', [id_del]).then(function(resultados) {
//   console.log(resultados)
// })

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
