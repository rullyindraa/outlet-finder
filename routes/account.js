var express = require('express');
var router = express.Router();
const connection = require('../src/db-connect');
const alert = require('alert-node');
const config = require ('../conf/config.js')
const Sequelize = require('sequelize');
const models = require('../src/models');
const bcrypt = require('bcrypt-nodejs');
const user = models.user;
const categories = models.categories;
const file = models.file;
const twoFactor = require('node-2fa');
const flash = require('express-flash');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// set uploads directory
		cb(null, './public/files/')
	},
	filename: (req, file, cb) => {
		// save file with current timestamp + user email + file extension
		cb(null, Date.now() + path.extname(file.originalname));
	}
})

const upload = multer({storage: storage});

router.get('/security', function(req, res) {
  user.findAll({
    where: {
      username: 'qyu'
    }
  }).then(rows => {
    var newSecret = twoFactor.generateSecret({name: '', account: 'qyu'})
    console.log('new secret',newSecret)
    var newToken = twoFactor.generateToken(newSecret.secret);
    console.log(newToken);
    user.update({
      secret_key: newSecret.secret,
      qr_url: newSecret.qr
    }, {
      where: {
        username: 'qyu'
      }
    }).then(rows => {
      var check1;
      if (rows.two_fa === '1'){
        check1 = 'enable'
      } else {
        check1 = 'disable'
      }
      if(req.user.role === true) {
        res.render('admin/security', {stwo_fa: rows[0].two_fa, qrcode: newSecret.qr, secret_key: newSecret.secret, data: rows, tok: newToken, check_2fa: check1, name: req.user.first_name +  ' ' + req.user.last_name, active5: 'active-navbar'})
      } else {
        res.render('business-owner/security', { title: 'Account Security | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active2: 'active-navbar' });
      }
    })
  })
});

// router.get('/verify', function (req, res) {
//   user.findOne({
//       where : {
//         username: 'qyu'
//       }
//     }).then(function(rows) {
//       console.log(rows.username)
//       var secret_token = req.body.secret_token;
//       console.log("secretnya",secret_token)
//       var verifyToken = twoFactor.verifyToken(rows.secret_key, secret_token);
//       console.log(rows.secret_key)
//       console.log(verifyToken)
//       console.log(secret_token)
//       // console.log(cobaa)
//       if (verifyToken !== null) {
//         // alert('Valid token.')
//         req.flash('valid', 'Valid token.')
//         req.flash('code', rows.secret_key)
//         res.render('admin/security',{'valid': req.flash('valid'), stwo_fa: rows[0].two_fa, qrcode: newSecret.qr, secret_key: newSecret.secret, data: rows, tok: newToken})
//         // res.render('admin/security');
//       } else {
//         // alert('Wrong token!')
//         // req.flash('failed', 'Wrong token!')
//         // req.flash('code', user.twofa_secret)
//         // res.render('admin/security', {token: req.query.token });
//       }
//       // console.log(twofa.verifyToken(user.twofa_secret, req.body.token));
//   })
// });

// // router.get('/verify', function(req, res) {

// // })

// router.post('/save', function (req, res) {
//   user.update({
//     two_fa: 'ENABLE'
//   }, { 
//     where : {
//       username: 'qyu'
//     }
//   }).then(function(rows) {
//     req.flash('success', 'Horray! Two factor authentication is enabled.')
//     res.render('admin/security', { 'valid': req.flash('success'), stwofa: 'enable', stwo_fa: rows[0].two_fa, qrcode: newSecret.qr, secret_key: newSecret.secret, data: rows, tok: newToken })
//   })
// })

router.get('/check', function(req, res, next) {
  // console.log('quswr', req.query.token)
  user.findOne({
    where: {
      username: 'qyu'
    }
  }).then(function(rows) {
    var verifyToken = twoFactor.verifyToken(rows.secret_key, req.query.secret_token);
    console.log("secret key: ",rows.secret_key);
    console.log('input token: ', req.query.secret_token)
    if (verifyToken !== null) {
      // console.log("secret key :",rows.secret_key)
      // console.log('qr :', rows.qr_url)
      // console.log(verifyToken)
      // res.send(true);
      // stwo_fa: rows[0].two_fa, qrcode: newSecret.qr, secret_key: newSecret.secret
      res.render('admin/security',{'valid': req.flash('valid'), stwofa: 'enable', 'enable': req.flash('code'), stwo_fa: rows.two_fa, qrcode: rows.qr_url, secret_key: rows.secret_key})
    } else {
      console.log('INVALID TOKEN');
      res.send(false);
      // req.flash('failed', 'Wrong token!')
      // // req.flash('code', user.twofa_secret)
      // res.render('admin/security', {token: req.query.token });
    }
    console.log("sampe sini")
  })
})

router.post('/account/check', function(req, res) {
  console.log('masuk ke post')
  user.update({
    two_fa: '1'
  }, {
    where: {
      username: 'qyu'
    }
  }).then(function(rows) {
    console.log('adalah..')
    req.flash('success', 'Horray! Two factor authentication is enabled.')
    res.render('admin/security', { 'valid': req.flash('success'), stwofa: 'enable' })
  })
})

router.get('/check/:token', function(req, res, next) {
  var verifytoken = twoFactor.verifyToken(req.user[0].secret_key, req.params.token);
  console.log(req.params.token)
  if (verifytoken !== null) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get('/basic-info', function(req, res, next) {
  user.findAll({
    where: {
      id: req.user.id
    },
    include: [
      {
        model: file,
        attributes: [['name', 'p'], ['relative_path', 'pp']]
      }
    ],
    raw:true
  }).then(function(rows) {
    if(req.user.role === true) {
      res.render('admin/basic-info', {
        title: 'Account Basic Info | Outlet Finder', 
        id: rows[0].id,
        first_name: rows[0].first_name,
        last_name: rows[0].last_name,
        email: rows[0].email,
        username: rows[0].username,
        phone_number: rows[0].phone_number, 
        photo: rows[0][`file.pp`],
        alt: rows[0][`file.p`],
        name: req.user.first_name + ' ' + req.user.last_name,
        active5: 'active-navbar'
      })
    } else {
      res.render('business-owner/basic-info', {
        title: 'Account Basic Info | Outlet Finder', 
        id: rows[0].id,
        first_name: rows[0].first_name,
        last_name: rows[0].last_name,
        email: rows[0].email,
        username: rows[0].username,
        phone_number: rows[0].phone_number, 
        photo: rows[0][`file.pp`],
        alt: rows[0][`file.p`],
        name: req.user.first_name + ' ' + req.user.last_name,
        active2: 'active-navbar'
      })
    }
  }).catch(err => {
    console.error(err);
  });
});

router.post('/basic-info', upload.single('photo'), function(req, res, next) {
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var email = req.body.email;
  var username = req.body.username;
  var phone_number = req.body.phone_number;
  var updatedAt = new Date();
  var photo = req.file;

  var target_path = '/files/' + req.file.filename;
  file.update(
      {
        relative_path: target_path,
        name: !req.file ? 'placeholder.jpg' : req.file.filename,
        original_name: req.file.originalname,
        mime_type : req.file.mimetype,
        updatedAt: updatedAt
      },
      {
        where: {
          id: req.user.fileId
        }
      },
      {
        include: [{
          model: user
        }]
      }
    )
    .then(row => {
      user.update(
        {
        first_name: first_name, 
        last_name: last_name,
        email: email, 
        username: username, 
        phone_number: phone_number, 
        updatedAt: updatedAt
        } , {
        where: {
          id: req.user.id
        }
      })
    })
    .then(function(rows) {
      if(req.user.role === true) {
        res.redirect('/basic-info');
      } else {
        res.redirect('/basic-info');
      }
    }).catch(err => {
      console.error(err);
    });
  // if(photo === undefined) {
  //   user.update({
  //     first_name: first_name, 
  //     last_name: last_name,
  //     email: email, 
  //     username: username, 
  //     phone_number: phone_number, 
  //     updatedAt: updatedAt
  //   } , {
  //     where: {
  //       id: req.user.id
  //     }
  //   }).then(function(rows) {
  //     res.redirect('/basic-info');
  //   }).catch(err => {
  //     console.error(err);
  //   });
  // } else {
  //   var target_path = '/files/' + req.file.filename;
  //   file.update(
  //     {
  //       relative_path: target_path,
  //       name: !req.file ? 'placeholder.jpg' : req.file.filename,
  //       original_name: req.file.originalname,
  //       mime_type : req.file.mimetype,
  //       updatedAt: updatedAt
  //     },
  //     {
  //       where: {
  //         id: req.user.fileId
  //       }
  //     },
  //     {
  //       include: [{
  //         model: user
  //       }]
  //     }
  //   )
  //   .then(row => {
  //     user.update(
  //       {
  //       first_name: first_name, 
  //       last_name: last_name,
  //       email: email, 
  //       username: username, 
  //       phone_number: phone_number, 
  //       updatedAt: updatedAt
  //       } , {
  //       where: {
  //         id: req.user.id
  //       }
  //     })
  //   })
  //   .then(function(rows) {
  //     if(req.user.role === true) {
  //       res.redirect('/basic-info');
  //     } else {
  //       res.redirect('/basic-info');
  //     }
  //   }).catch(err => {
  //     console.error(err);
  //   });
  // }
});

router.get('/change-password', function(req, res, next) {
  if(req.user.role === true) {
    res.render('admin/change-password', { title: 'Account Change Password | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active5: 'active-navbar'  });
  } else {
    res.render('business-owner/change-password', { title: 'Account Change Password | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active2: 'active-navbar'  });
  }
})

router.post('/change-password', function(req, res, next) {
  user.findOne({
    where: {
      username: req.user.username
    }
  }).then(rows => {
    console.log(req.body.old_password)
    var old_password = req.body.old_password;
    var new_password = req.body.new_password;
    var confirm_password = req.body.confirm_password;
    console.log('new password', new_password);
    console.log('confirm', confirm_password)

    if (new_password === confirm_password) {
      var dbPassword  = rows.password;
      console.log(dbPassword)
      bcrypt.compare(old_password, dbPassword, function(err, rest) {
        if(rest) {
          console.log(new_password);
          var pass = bcrypt.hashSync(new_password);
          // console.log('username: ', rows.username)
          user.update({
            password: pass
          }, {
            where: {
              username: rows.username
            }
          }).then(rows => {
            alert('Password has been changed')
          })
        } else {
          alert('wrong old password!')
        }
        res.redirect('/change-password')
      })
    } else {
      req.flash('not_match', 'The new password and confirm password are not the same')
      if(req.user.role === true) {
        res.render('admin/change-password', { 'not_match': req.flash('not_match')})
      } else {
        res.render('business-owner/change-password', { 'not_match': req.flash('not_match')})
      }
    }
  })
})

router.get('/setting', function(req, res) {
  if(req.user.role === true) {
    res.render('admin/setting', { title: 'Account Setting | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active5: 'active-navbar' });
  } else {
    res.render('business-owner/setting', { title: 'Account Setting | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active2: 'active-navbar' });
  }
});

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
