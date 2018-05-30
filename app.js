var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
const config = require ('./conf/config.js')
const Sequelize = require('sequelize');
const models = require('./src/models');
const user = models.user;
const review = models.review;
const file = models.file;
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sess = require('express-session');
const Store = require('express-session').Store;
const BetterMemoryStore = require('session-memory-store')(sess);
const flash = require('express-flash')
const alert = require('alert-node')
var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var businessRouter = require('./routes/business-owner');
var login = require('./routes/login');
var register = require('./routes/register/register')
var account = require('./routes/account');

var app = express();

app.use(sess({
  name: 'JSESSION',
  secret: 'MYSECRETISVERYSECRET',
  store:  store,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(favicon(path.join(__dirname, 'public', 'icon.png')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use('local', new LocalStrategy({
  username: 'username',
  password: 'password',
  passReqToCallback: true //passback entire req to call back
} , function (req, username, password, done, err){
      if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
      // return done(req.flash('message',err));
      user.findAll({
        where: {
          username: [username]
        }
      }).then(function(rows, err) {
        if(!rows.length){ return done(null, false, alert('message','Invalid username.')); }
        var dbPassword  = rows[0].password;
        console.log('dbpw = ', dbPassword)
        console.log('pass = ', password)
        bcrypt.compare(password, dbPassword, function(err, res) {
          if(res) {
            console.log("berhasil login")
            return done(null, rows[0]);
           } else {
             console.log('tidak berhasil login')
            //  res.redirect('/login')
            return done(null, false, alert('Invalid Password','Invalid password.'));
           } 
        
        });          
      }).catch(function(err) {
        console.log(err)
      })
    }
));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  user.findAll({
    where: {
      id: [id]
    },
    include: [
      {
        model: file,
        attributes: [['name', 'p'], ['relative_path', 'pp']]
      }
    ],
    raw:true
  }).then(function(rows, err) {   
    done(err, rows[0]);
  })
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', isAuthenticated, adminRouter);
app.use('/business-owner', isAuthenticated, businessRouter);
// app.use('/business-owner', businessRouter);
app.use('/login', login);
app.use('/', isAuthenticated, account);
app.use('/register', register)

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
