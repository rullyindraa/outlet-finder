var express = require('express');
var router = express.Router();
const connection = require('../src/db-connect');
const alert = require('alert-node');
const config = require ('../conf/config.js')
const Sequelize = require('sequelize');
const models = require('../src/models');
const bcrypt = require('bcrypt-nodejs');
const user = models.user;
const category = models.category;
const helper_category = models.helper_category;
const business = models.business;

router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Dashboard | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active1: 'active-navbar' });
});

router.get('/categories', function(req, res) {
  category.findAll({
    attributes: [['name', 'category_name'], [Sequelize.fn('COUNT', Sequelize.col('businessId')), 'num_of_business']],
    group: [['id']],
    include: [
      {
        model: helper_category,
        attributes: ['businessId', 'categoryId']
      }
    ]
  }).then(rows => {
    console.log(rows);
    res.render('admin/list-categories', { title: 'Category Lists | Outlet Finder', data: rows, name: req.user.first_name + ' ' + req.user.last_name})
  }).catch(err => {
    console.error(err);
  });
});

router.get('/categories/add-category', function(req, res) {
  res.render('admin/add-category', { title: 'Add Category | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active2: 'active-navbar'});
});

router.post('/categories/add-category', function(req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var createdAt = new Date();
  var data = { name: name, description: description, createdAt: createdAt};

  category.findAll({
    where: {
      name: [name]
    }
  }).then(function(rows) {
    if(rows.length > 0){
      alert('Category name is already added!')
    } else {
      category.bulkCreate([data]).then(function(rows) {
        console.log(rows);
      })
      res.redirect('/admin/categories')
    }
  }).catch(function(err) {
    throw err;
  })
});

router.get('/categories/:id', function(req, res) {
  category.findAll({
    where: {
      id: [req.params.id]
    }
  }).then(function(rows) {
    res.render('admin/edit-category', {
      title: 'Edit Category | Outlet Finder', 
      id: rows[0].id,
      name: rows[0].name,
      description: rows[0].description,
      name: req.user.first_name + ' ' + req.user.last_name, 
      active2: 'active-navbar' 
    })
  }).catch(err => {
    console.error(err);
  });
});

router.post('/categories/edit', function(req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var description = req.body.description;
  var updatedAt = new Date();

  category.update({
    name: name,
    description: description,
    updatedAt: updatedAt
  }, {
    where: {
      id: id
    }
  }).then(function(rows) {
    res.redirect('/admin/categories')
  }).catch(err => {
    console.error(err);
  });
});

router.post('/categories/delete/:id', function(req, res, next) {
  category.destroy({
    where: {
      id : [req.params.id]
    }
  }).then(function(err) {
    res.redirect('/admin/categories')
  })
});

router.get('/business', function(req, res) {
  business.findAll({
    // where: {
    //   userId: req.user.id
    // },
    attributes: [['name', 'business'],
    [Sequelize.fn('GROUP_CONCAT', Sequelize.literal("categories.name SEPARATOR ', '")), 'category_names']],
    group: ['business.id'],
    include: [
      {
        model: category,
        attributes: ['name'] 
      }
    ]
  }).then(rows => {
    console.log(rows);
    res.render('admin/list-all-business', { title: 'Business Lists | Outlet Finder', data: rows, name: req.user.first_name + ' ' + req.user.last_name});
  })
});

router.get('/outlets', function(req, res) {
  res.render('admin/list-all-outlet', { title: 'Outlet Lists | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name });
});

router.get('/reviews', function(req, res) {
  res.render('admin/reviews', { title: 'Reviews | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name });
});

router.get('/basic-info', function(req, res) {
  res.render('admin/basic-info', { title: 'Account Basic Info | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active5: 'active-navbar' });
});

router.get('/change-password', function(req, res) {
  res.render('admin/change-password', { title: 'Account Change Password | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active5: 'active-navbar'  });
});

router.get('/security', function(req, res) {
  res.render('admin/security', { title: 'Account Security | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active5: 'active-navbar'  });
});

router.get('/add-admin', function(req, res, next) {
  res.render('admin/add-admin', { title: 'Add Administrator | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, active3: 'active-navbar'  })
});

router.post('/add-admin', function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = username;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var pass = bcrypt.hashSync(password)
  var data_user = {username: username, email: email, password: pass, first_name: first_name, last_name:last_name, role: '1', status: '1'};

  user.findAll({
    where: {
      username: [username]
    }
  }).then(function(rows) {
    if(rows.length > 0){
      alert('Username already in use!')
    } else {
      user.bulkCreate([data_user]).then(function(rows) {
        console.log(rows);
      })
      res.redirect('/admin/list-administrators')
    }
  }).catch(function(err) {
    throw err;
  })
});

router.get('/list-administrators', function(req, res, next) {
  var adminList =[];
  user.findAll({
    where: {
      role : [1]
    }
  }).then(function(rows) {
    res.render('admin/list-administrators', { title: 'List Administrators | Outlet Finder', data: rows, name: req.user.first_name + ' ' + req.user.last_name, active3: 'active-navbar'  })
  }).catch(err => {
    console.error(err);
  });
});

router.post('/delete/:id', function(req, res, next) {
  user.destroy({
    where: {
      id : [req.params.id]
    }
  }).then(function(err) {
    res.redirect('/admin/list-administrators')
  })
});

router.get('/list-business-owners', function(req, res, next) {
  var boList =[];
  user.findAll({
    where: {
      role : [0]
    }
  }).then(function(rows) {
    res.render('admin/list-business-owners', { title: 'List Business Owners | Outlet Finder', data: rows, name: req.user.first_name + ' ' + req.user.last_name, active4: 'active-navbar'  })
  }).catch(err => {
    console.error(err);
  });
});

module.exports = router;