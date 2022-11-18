/********************************************************
 *              Importing modules           
 ********************************************************/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config()

/*  
    @msg    :   import custom modules
    @return :   my module
                                        */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

/*  
    @msg    :   view engine setup
    @return :   EJS
                                        */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/********************************************************
 *              Initializing || config env          
 ********************************************************/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/********************************************************
 *              Route Lists         
 ********************************************************/

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*  
    @msg    :   catch 404 and forward to error handler
    @return :   can't accept any req route if not exist
                                        */
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
