var express = require('express');
var router = express.Router();
const passport = require('passport');
const alert = require('alert-node');
const config = require ('../conf/config.js')
const Sequelize = require('sequelize');
const models = require('../src/models');
const bcrypt = require('bcrypt-nodejs');
const async = require('async');
const crypto = require('crypto');
const moment = require('moment');
const user = models.user;
const sgMail = require('@sendgrid/mail');

router.get('/', function(req, res, next) {
  res.render('login/login-regist', { title: 'LOGIN' });
});

router.get('/signin', function(req, res, next) {
  passport.authenticate('local', function(err, users, info) {
    console.log("coba", req.query.username)
    // console.log('two-fa', req.query.two_fa)
    if (err){ return next(err) }
    if (!users) {
      return res.redirect('/login');
    }
    user.findAll({
      where: {
        username: [req.query.username]
      }
    }).then(function(rows) {
        console.log('userr: ',rows)
        if(rows[0].two_fa === true) {
          req.login(users, function(err) {
            if (err) { return next(err); }
              console.log('masuuuk')
              return res.redirect('/two_fa');
          });
        } else {
          if(rows[0].role === true) {
            req.login(users, function(err) {
              if (err) { return next(err); }
              console.log('akjsh')
              return res.redirect('/admin/');
            });
          }
          else{
            req.login(users, function(err) {
              if (err) { return next(err); }
              console.log('akjsh')
              return res.redirect('/business-owner/');
            });
          }
        }
    }).catch(function(err) {
      throw err;
    })
  })(req, res, next);
})

router.get('/forgot', function(req, res) {
  res.render('login/forgot')
})

router.post('/reset_password', function(req, res, next) {
    var email = req.body.email;
    console.log("daftar email :",email);
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        var email = req.body.email;
        var username = req.body.username;
        user.findAll({
          where: {
            email: email
          }
        }).then(function(rows) {
          if(rows === null) {
            alert('Email is not registered ! ')
          } else {
            var token_active = token;
            var create_at = moment().toDate();
            var insert_user = {
              username: username, email: email, token: token_active, create_at: create_at, role:0
            }
            console.log('tokennya ', token_active)
            user.update({
              token: token_active,
              password: 'pass'
            }, {
              where: {
                email: email
              }
            }).then(function(rows, err) {
              alert('Check your email to reset your password')
              done(err, rows, token)
            })
          }
        }).catch(function(err) {
          throw err;
        })
      },
      function(rows, token, done) {
        var mailOptions = {
          to: email,
          from: config.message.from,
          subject: config.message.subject_reset,
          text: config.message.text_reset1 + 'http://'+ req.headers.host +'/login/set_password/'+ token + '\n\n' + config.message.text_reset2
        };
        sgMail.send(mailOptions, function(err) {
          done(err, 'done');
        }) 
      }
      ], function(err) {
        if (err) return next(err);
        res.redirect('/login');
      });
});

router.get('/set_password/:token', function(req, res, next) {
  var token = req.params.token
  user.findAll({
    where: {
      token: token
    }
  }).then(function(rows) {
    res.render('login/reset-password', {susername: rows[0].username, semail: rows[0].email})
  })
})

router.post('/reset', function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  user.findAll({
    where: {
      username:username
    }
  }).then(function(rows) {
    var pass = bcrypt.hashSync(password);

    user.update({
      password: pass,
      token : null
    }, {
      where: {
        username: username
      }
    }).then(function(rows) {
      alert('your password has been updated!')
    }).catch(err => {
      throw err;
    })
  })
  res.redirect('/login')
})


module.exports = router;