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
var fs = require('fs');

router.get('/security', function(req, res) {
  // var username:
  user.findAll({
    where: {
      username: req.user.username
    }
  }).then(rows => {
    var newSecret = twoFactor.generateSecret({name: 'Outlet Finder', account: req.user.username})
    console.log('new secret',newSecret)
    var newToken = twoFactor.generateToken(newSecret.secret);
    console.log(newToken);
    var check1 = rows[0].two_fa;
    var username = rows[0].username;
    console.log('status two fa', check1)
    user.update({
      secret_key: newSecret.secret,
      qr_url: newSecret.qr
    }, {
      where: {
        username: username
      }
    }).then(rows => {
      if(req.user.role === 1) {
        res.render('admin/security', {stwo_fa: rows[0].two_fa, qrcode: newSecret.qr, secret_key: newSecret.secret, data: rows, tok: newToken, scheck1: check1, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active5: 'active-navbar'})
      } else {
        res.render('business-owner/security', {stwo_fa: rows[0].two_fa, qrcode: newSecret.qr, secret_key: newSecret.secret, data: rows, tok: newToken, scheck1: check1, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active2: 'active-navbar'})
      }
    })
  })
});

router.get('/check', function(req, res, next) {
  user.findOne({
    where: {
      username: req.user.username
    }
  }).then(function(rows) {
    var verifyToken = twoFactor.verifyToken(rows.secret_key, req.query.secret_token);
    console.log("secret key: ",rows.secret_key);
    console.log('input token: ', req.query.secret_token);
    if (verifyToken !== null) {
      req.flash('Valid', 'Two factor authentication now active !')
      if (req.user.role === 1) {
        res.render('admin/security',{'valid': req.flash('Valid'), stwo_fa: rows.two_fa, qrcode: rows.qr_url, secret_key: rows.secret_key, scheck1: rows.two_fa, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active5: 'active-navbar'})
      } else {
        res.render('business-owner/security',{'valid': req.flash('Valid'), stwo_fa: rows.two_fa, qrcode: rows.qr_url, secret_key: rows.secret_key, scheck1: rows.two_fa, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active2: 'active-navbar'})
      }
    } else {
      console.log('INVALID TOKEN');
      res.send(false);
      // res.render('admin/security', {token: req.query.token });
    }
    console.log("sampe sini")
  })
})

router.post('/check', function(req, res) {
  console.log('masuk ke post')
  user.update({
    two_fa: '1'
  }, {
    where: {
      username: req.user.username
    }
  }).then(function(rows) {
    console.log('adalah..')
    req.flash('success', 'Horray! Two factor authentication is enabled.')
    if (req.user.role === 1) {
      res.render('admin/security', { 'valid': req.flash('success'), scheck1: rows.two_fa, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active5: 'active-navbar'})
    } else {
      res.render('business-owner/security', { 'valid': req.flash('success'), scheck1: rows.two_fa, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active2: 'active-navbar' })
    }
  })
})

// router.get('/check/:token', function(req, res, next) {
//   var verifytoken = twoFactor.verifyToken(req.user[0].secret_key, req.params.token);
//   console.log(req.params.token)
//   if (verifytoken !== null) {
//     res.send(true);
//   } else {
//     res.send(false);
//   }
//  });

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/files/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	}
})
const upload = multer({storage: storage});

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
    console.log(rows);
    if(req.user.role === 1) {
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
  // var updatedAt = new Date();

  if (req.file) {
		// if old photo exists (old photo not empty) then unlink / remove the photo in directory
		if (req.body.old_photo !== '')
			fs.unlink(`public/files/${req.body.old_photo}`);
    var target_path = '/files/' + req.file.filename;
    file.update(
      {
        name: req.file.filename,
        relative_path: target_path,
        original_name: !req.file ? 'placeholder.jpg' : req.file.originalname,
        mime_type : req.file.mimetype,
        updatedAt: new Date()
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
        updatedAt: new Date()
        } , {
        where: {
          id: req.user.id
        }
      })
    })
    .then(function(rows) {
      // console.log(req.file);
      res.redirect('/basic-info');
    }).catch(err => {
      console.error(err);
    });
  }
  user.update({
    first_name: first_name, 
    last_name: last_name,
    email: email, 
    username: username, 
    phone_number: phone_number, 
    updatedAt: new Date()
  } , {
    where: {
      id: req.user.id
    }
  }).then(function(rows) {
    if(req.user.role === 1) {
      res.redirect('/basic-info');
    } else {
      res.redirect('/basic-info');
    }
  }).catch(err => {
    console.error(err);
  });
});

router.get('/change-password', function(req, res, next) {
  if(req.user.role === 1) {
    res.render('admin/change-password', { title: 'Account Change Password | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active5: 'active-navbar', photo:req.user[`file.pp`]});
  } else {
    res.render('business-owner/change-password', { title: 'Account Change Password | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active2: 'active-navbar', photo:req.user[`file.pp`]});
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
      if(req.user.role === 1) {
        res.render('admin/change-password', { 'not_match': req.flash('not_match')})
      } else {
        res.render('business-owner/change-password', { 'not_match': req.flash('not_match')})
      }
    }
  })
})

router.get('/setting', function(req, res) {
  if(req.user.role === 1) {
    res.render('admin/setting', { title: 'Account Setting | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active5: 'active-navbar', photo:req.user[`file.pp`]});
  } else {
    res.render('business-owner/setting', { title: 'Account Setting | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active2: 'active-navbar', photo:req.user[`file.pp`]});
  }
});

router.get('/two_fa', function(req, res) {
  console.log('masuk sini')
  console.log(req.user.username)
  // res.render('login/two-fa')
  res.render('login/two-fa', { title: 'Two Factor Authentication | Outlet Finder', susername: req.user.username, photo:req.user[`file.pp`]});
})

router.post('/two_fa', function(req, res, next) {
  console.log('coba masuk')
  // console.log(req.body.username);
  console.log('query :', req.user.username)
  username = req.body.username;
  console.log(username)
  user.findOne({
    where : {
      username : username
    }
  }).then(function(rows) {
    var verifyToken = twoFactor.verifyToken(rows.secret_key, req.body.token)
    console.log(verifyToken);
    if (verifyToken === null) {
      req.flash('wrong', 'Please enter valid token !')
      res.render('login/two-fa',{'wrong': req.flash('wrong'), susername: rows.username})
    } else {
      if(rows.role === true){
        var last_login = new Date();
        user.update({
          last_login : last_login
        }, {
          where : {
            username : username
          }
        }).then(rows => {
            console.log('masuk ke admin')
            res.render('admin/index', { title: 'Account Dashboard | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active5: 'active-navbar' });
        });
      } else {
        var last_login = new Date();
        user.update({
          last_login : last_login
        }, {
          where : {
            username : username
          }
        }).then(rows => {
            res.render('busines-owner/index', { title: 'Account Dashboard | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active5: 'active-navbar' });
        });
        
      }
    }
  })
})

router.get('/logout', function(req,res){
  console.log('logout')
  req.logout();
  res.redirect('/');
});

module.exports = router;