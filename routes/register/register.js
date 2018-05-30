var express = require('express');
var router = express.Router();
const passport = require('passport');
const alert = require('alert-node');
const config = require ('../../conf/config.js')
const Sequelize = require('sequelize');
const models = require('../../src/models');
const bcrypt = require('bcrypt-nodejs');
const user = models.user;
const async = require('async');
const crypto = require('crypto');
const moment = require('moment');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', function(req, res, next) {
  res.render('login/login-regist', { title: 'LOGIN' });
});


router.post('/verify_account', function(req, res, next) {
  console.log('username : ',req.body.username);
  console.log('email : ', req.body.email);

  var email = req.body.email;
    var username = req.body.username;
    console.log(email);
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
        var token_active = token;
        user.findAll({
          where: {
            username: username
          }
        }).then(function(rows) {
          if(rows.length>0) {
            alert('username already used!');
          } else {
            var create_at = moment().toDate();
            var insert_user = {
              username: username, email: email, token: token_active, create_at: create_at, role:0
            }
            console.log('pengecekan kketiga')
            user.bulkCreate(insert_user).then(function(rows, err) {
              alert('check your email to verify your account!')
              done(err, token, rows)
            })
          }
        }).catch(function(err) {
          console.log('SALAAHHH !!')
          throw err;
        })
      },
      function(token, rows, done) {
        console.log('tokennya :',token)
        var mailOptions = {
          to: email,
          from: config.register_message.from,
          subject: config.register_message.subject_register,
          text: config.register_message.text_register1 + 'http://' + req.headers.host + '/register/next/' + token + '\n\n' + config.register_message.text_register2
        };
        console.log("token : ",token, 'rows', rows, 'done', done);
        console.log(mailOptions);
        sgMail.send(mailOptions);
      }
      ], function(err) {
        if (err) return next(err);
        res.redirect('/login');
      });


  res.redirect('/register')
});

router.get('/register_next', function(req, res) {
  res.render('login/register-next');
})

router.get('/next/:token', function(req, res){
  user.findAll({
    where: {
      token:[req.params.token]
    }
  }).then(function(rows) {
    if(rows<0) {
      alert('token is invalid !')
    } else {
      var username = rows[0].username;
      var email = rows[0].email;
      res.render('login/register-next', {susername: username, stoken: req.params.token, semail: email})
    }
  })
});

router.post('/next/:token', function(req, res, next) {
  var username = req.body.username;
  console.log("masuk ke post");
  async.waterfall ([
    function(done) {
      var token = req.params.token;
      console.log(token);
      user.findAll({
        where: {
          token: token
        }
      }).then(function(rows) {
        var password = req.body.password;
        var password2 = req.body.password_confirm;
        var pass = bcrypt.hashSync(password);
        user.update({
          password: pass,
          token: null,
          role: '0'
        }, {
          where: {
            token: token
          }
        }).then(function(rows) {
        }).catch(function(err) {
          throw err;
        })
        // res.redirect('/busines-owner/')
        done(rows, 'done')
      })
      res.redirect('/business-owner')
    },
    // function(rows, done) {
    //   console.log('rooowa', rows)
      // console.log("yang ke 3 :", rows)
      // var optnMsg = {
      //   to: rows[0].email,
      //   from: config.message.from,
      //   subject: config.message.subject_success,
      //   text: config.message.text_confirm
      // };
      // sgMail.send(optnMsg, function(err) {
      //   console.log("email sudah dikirim");
      //   done(err, 'done');
      // });
    // }, 
    ], function(err) {
     if (err) return next(err);
      res.render('/');
    })
    
});


module.exports = router;