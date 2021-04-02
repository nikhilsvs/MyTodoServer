var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var config = require('./config');
var passport = require('passport');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var User = require('./models/users');
var taskRouter = require('./routes/tasks');
var LocalStrategy = require('passport-local').Strategy;
var cors = require('cors');
var app = express();



var url = config.url;
// view engine setup

mongoose.connect(url)
.then((db)=>{
  console.log("Connected to DB");
},(err)=>{
  console.log(err);
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*passport.serializeUser(function(user,done){
  done(null,user.id);
});
passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    done(err,user);
  });
});*/

/*passport.use(new LocalStrategy(function(username,password,done){
  User.findOne({username:username},(err,user)=>{
    if(err){
      return done(err);
    }
    else if(!user){
      done(null,false);
    }
    else if(user.passpword != password){
      return done(null,false);
    }
    else{
      return done(null,user);
    }
  });
}));*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks',taskRouter);

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
