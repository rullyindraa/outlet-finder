var express = require('express');
var router = express.Router();
const passport = require('passport');
const alert = require('alert-node');
const config = require ('../../conf/config.js')
const Sequelize = require('sequelize');
const models = require('../../src/models');
const bcrypt = require('bcrypt-nodejs');
const user = models.user;
const file = models.file;
const async = require('async');
const crypto = require('crypto');
const moment = require('moment');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const validateJoi = require('../../src/validation/create-user');
var multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/files/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	}
})

const upload = multer({storage: storage});

router.get('/', function(req, res, next) {
  res.render('login/register-2', { title: 'LOGIN' });
});


router.post('/verify_account', function(req, res, next) {
  console.log(req.body.username);
  console.log(req.body.email)
  validateJoi.validate({
    username: req.body.username,
    email: req.body.email
  }, function(errors, value) {
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
          var create_at = moment().toDate();
          var insert_user = {
            username: username, email: email, token: token_active, create_at: create_at, role:0, status: '0'
          }
          console.log("isian akun :", insert_user)
  
          // user.create(insert_user).then(function(rows, err) {
          //   user.findAll({
          //     where : {
          //       username : username
          //     }
          //   }).then(function(wrr, rows) {
          //     done(err, token, rows)
          //   })
          // })
  
          user.findAll({
            where: Sequelize.or({
              username: username
            }, {
              email : email
            })
          }).then(function(rows) {
            if(rows.length>0) {
              alert('username or email already used!');
            } else {
              var create_at = moment().toDate();
              var insert_user = {
                username: username, email: email, token: token_active, create_at: create_at, role:0
              }
              console.log('pengecekan kketiga')
              user.create(insert_user).then(function(rows, err) {
                user.findAll({
                  where : {
                    username : username
                  }
                }).then(function(wrr, rows) {
                  alert('check your email to verify your account!');
                  res.redirect('/login')
                  done(err, token, rows)
                })
                .catch(err => {
                  console.log(err);
                  res.render('error');
                })
              })
            }
          }).catch(function(err) {
            console.log(err);
            res.render('error');
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
          // console.log('APAKAH INI MASALAHNYA',"token : ",token, 'rows', rows, 'done', done);
          console.log('isi buat kirim email ',mailOptions);
          sgMail.send(mailOptions);
        }
        ], function(err) {
          if (err) return next(err);
          res.redirect('/login');
        });
    })
  console.log('username : ',req.body.username);
  console.log('email : ', req.body.email);
});

router.get('/register_next', function(req, res) {
  res.render('login/register-next');
})

router.get('/next/:token', function(req, res,){
  console.log('sampe sini aja coba')
  user.findAll({
    where: {
      token:[req.params.token]
    }
  }).then(function(rows) {
    if(rows<0) {
      alert('token is invalid !')
    } else {
      console.log(rows)
      var username = rows[0].username;
      var email = rows[0].email;
      res.render('login/register-next', {susername: username, stoken: req.params.token, semail: email})
    }
  })
  .catch(err => {
    console.log(err);
    res.render('error', {message : err});
  })
});

router.post('/next/:token', upload.single('photo'), function(req, res, next) {
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
        if (password !== password2){
          alert('Password doesn`t match!')
        } else {
          file.create({
            relative_path: 'https://krowdster-11pcypgr4.netdna-ssl.com/wp-content/uploads/2015/11/Twitter-Egg.jpg'
          }, {
            include: [{
              model: user
            }]
          })
          .then(row => {
            user.update({
              password: pass,
              token: null,
              role: '0',
              status: '1',
              fileId: row.id
            }, {
              where: {
                token: token
              }
            }).then(function(rows) {
            }).catch(function(err) {
              console.log(err);
              res.render('error');
            })
          })
          .catch(err => {
            console.log(err);
            res.render('error');
          })
       
        console.log(rows)
        // req.login(users, function(err) {
            // console.log('user 2:')
            return res.redirect('/business-owner/')
        // });
          done(rows, 'done') }
      })
      .catch(err => {
        console.log(err);
        res.render('error');
      })
    
      
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