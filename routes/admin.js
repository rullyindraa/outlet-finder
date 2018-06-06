var express = require('express');
var router = express.Router();
const connection = require('../src/db-connect');
const alert = require('alert-node');
const config = require ('../conf/config.js')
const Sequelize = require('sequelize');
const models = require('../src/models');
const bcrypt = require('bcrypt-nodejs');
const user = models.user;
const address = models.address;
const category = models.category;
const helper_category = models.helper_category;
const business = models.business;
const outlet = models.outlet;
const page_view = models.page_view;
const review = models.review;
const moment = require('moment')

router.get('/', function(req, res, next) {
  business.findAndCountAll(
    {
    // where: {
    //   userId: req.user.id
    // },
    attributes: [
      //'id',['name', 'business'],
    [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col("outlet.id"))), 'count_outlet'],
    [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col("outlet->review.id"))), 'count_review']
    
    ],
    include: [
      {
        model: outlet,
        attributes: ['id', 
        //[Sequelize.fn('COUNT', Sequelize.col("outlet.review.id")), 'count_review']
        ],
        include: [
          {
            model: review,
            attributes: ['id',
            // [Sequelize.fn('COUNT', Sequelize.col("review.id")), 'count_review']
            ],
            //required: true,
          }
        ],
      }
    ],
    //required: true,
    distinct:true,
    raw:true
  })
  .then(result => {
    category.findAndCountAll()
    .then(cat => {
      console.log('result', result);
      console.log('cat', cat);
      var rows = result.rows[0].count_outlet,
        count = result.count,
        count_review= result.rows[0].count_review,
        count_cat = cat.count;
      //console.log('yes', count)
      res.render('admin/index', {
        title: 'Dashboard | Outlet Finder', 
        totalo:rows, totalb: count, 
        totalr:count_review,
        totalc: count_cat,
        name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`],
        active1: 'active-navbar'
      })
    })
  })
  // res.render('admin/index', { title: 'Dashboard | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active1: 'active-navbar' });
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
    res.render('admin/list-categories', { title: 'Category Lists | Outlet Finder', data: rows, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active2: 'active-navbar'})
  }).catch(err => {
    console.error(err);
  });
});

router.get('/categories/add-category', function(req, res) {
  res.render('admin/add-category', { title: 'Add Category | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active2: 'active-navbar'});
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
      photo:req.user[`file.pp`], 
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
    attributes: ['id', ['name', 'business'],
    //[Sequelize.fn('GROUP_CONCAT', Sequelize.literal("categories.name SEPARATOR ', '")), 'category_names']],
    [Sequelize.fn('GROUP_CONCAT', Sequelize.literal("DISTINCT(categories.name) SEPARATOR ', '")), 'category_names'],
    [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col("outlet.id"))), 'count_outlet']
    ],
    group: ['business.id'],
    include: [
      {
        model: category,
        attributes: ['name'] 
      },
      {
        model: outlet,
        group: ['businessId']
      }
    ],
    raw:true
  }).then(rows => {
    category.findAll()
      .then(cat => {
        console.log(rows);
        //console.log(categories);
        res.render('admin/list-all-business', { title: 'Business Lists | Outlet Finder', data: rows, categories: cat, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]});
      })
  })
});

router.get('/outlets', function(req, res) {
  outlet.findAll({
    attributes: ['id', ['name', 'outlet_name'],
    [Sequelize.fn('COUNT', Sequelize.col("page_view.id")), 'count_view']],
    group: ['outlet.id'],
    include: [
      {
        model: business,
        // where: {
        //   userId: req.user.id
        // },
        attributes: [['name', 'business_name']],
      },
      {
        model: address,
        attributes: [['adm_area_lv2', 'city_name']]
      },
      {
        model: page_view,
        group: ['outletId'],
      },
    ],
    raw: true
  })
  .then(rows => {
    category.findAll()
    .then(cat => {
      console.log(rows);
      res.render('admin/list-all-outlet', { title: 'Outlet Lists | Outlet Finder', data: rows, active4: 'active-navbar', categories: cat, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`] });
    })
  })
  //res.render('admin/list-all-outlet', { title: 'Outlet Lists | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]});
});

router.get('/reviews', function(req, res) {
  review.findAll({
    attributes: ['id', 'name', 'email', 'content', 'rating', 'createdAt'],
    include: [
      {
        model: outlet,
        include: [{
          model: business,
          // where: {
          //   userId: req.user.id
          // },
          attributes:['id']
        }],
        attributes: ['id',['name', 'outlet_name']]
      }
    ],
    order: [
      ['createdAt', 'DESC' ]
    ],
    raw:true
  }).then(rows => {
    business.findAll()
    .then(bus => {
      //console.log('inireview',rows);
      var reviewList = [];
      for (var i = 0; i < rows.length; i++) {
        var review = {
          'id' : rows[i].id,
          'name':rows[i].name,
          'email':rows[i].email,
          'content':rows[i].content,
          'createdAt':moment(rows[i].createdAt).fromNow(),
          'rating':rows[i].rating,
          'outlet_id':rows[i]['outlet.id'],
          'outlet_name': rows[i]['outlet.outlet_name']
        }
        reviewList.push(review);
        console.log('revv',reviewList);
      }
      res.render('admin/reviews', { title: 'Reviews | Outlet Finder', 
        data: reviewList, business: bus, 
        name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]
      });
    })
  })
  // res.render('admin/reviews', { title: 'Reviews | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active5:'active-navbar' });
});

router.get('/add-admin', function(req, res, next) {
  res.render('admin/add-admin', { title: 'Add Administrator | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active3: 'active-navbar'  })
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
  var admin_list =[];
  user.findAll({
    where: {
      role : [1]
    }
  }).then(function(rows) {
    var list_admin = [];
    for (var i = 0; i < rows.length; i++) {
      var list = {
        'id' : rows[i].id,
        'first_name':rows[i].first_name,
        'last_name':rows[i].last_name,
        'email':rows[i].email,
        'username':rows[i].username,
        'last_login':moment(rows[i].last_login).format('MMMM Do YYYY, h:mm:ss a')
      }
      admin_list.push(list);
    }
    res.render('admin/list-administrators', { title: 'List Administrators | Outlet Finder', data: admin_list, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active3: 'active-navbar'  })
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
    var list_bo = [];
    for (var i = 0; i < rows.length; i++) {
      var list = {
        'id' : rows[i].id,
        'first_name':rows[i].first_name,
        'last_name':rows[i].last_name,
        'email':rows[i].email,
        'phone_number':rows[i].phone_number,
        'username':rows[i].username,
        'last_login':moment(rows[i].last_login).format('MMMM Do YYYY, h:mm:ss a'),
        'status': rows[i].status

      }
      list_bo.push(list);
    }
    res.render('admin/list-business-owners', { title: 'List Business Owners | Outlet Finder', data: list_bo, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active4: 'active-navbar'  })
  }).catch(err => {
    console.error(err);
  });
});

module.exports = router;