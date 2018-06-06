var express = require('express');
var router = express.Router();
const alert = require('alert-node');
const config = require ('../conf/config.js')
const Sequelize = require('sequelize');
const models = require('../src/models');
const bcrypt = require('bcrypt-nodejs');
const user = models.user;
const outlet = models.outlet;
const business = models.business;
const address = models.address;
const file = models.file;
const category = models.category;
const review = models.review;
const moment = require('moment');
const flash = require('connect-flash')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('guest/index', { title: 'Oulet Finder' });
});
router.get('/search-result', function(req, res, next) {
  res.render('guest/search-result', { title: 'Search Result | Oulet Finder' });
});
router.get('/categories', function(req, res, next) {
  category.findAll()
  .then(categories => {
    res.render('guest/categories', { title: 'Categories | Outlet Finder', val: categories });
  })
});

// router.get('/detail', function(req, res, next) {
//   res.render('guest/detail', { title: 'Detail Outlet | Oulet Finder' });
// });

router.get('/detail/outlet/:id', function(req, res, next) {
  outlet.findAll({
    where: {
      id: [req.params.id]
    },
    include: [
      {
        model: business,
        attributes: ['id', 'name', 'description', 'email', 'phone_number', 'website'],
        //group: ['business.id'],
        include: [
          {
            model: file,
            attributes: ['name', ['relative_path', 'path']]
          },
          {
            model: address,
            attributes: ['adm_area_lv2', 'formatted_address']
          }
          // {
          //   model: category,
          //   //attributes: ['name']
          //   attributes: [[Sequelize.fn('GROUP_CONCAT', Sequelize.literal("name SEPARATOR ', '")), 'category_names']]
          // }
        ]
      },
      {
        model: address,
        attributes : ['adm_area_lv2', 'formatted_address', 'location']
      },
      {
        model: review,
        //order: ['id', 'ASC'],
        //limit: 1,
      },
    ],
    order: [
      [ review, 'createdAt', 'DESC' ]
    ],
    raw:true
  })
  .then(rows => {
    console.log('inioutlet',rows);
    // console.log('itu', cat);
    // console.log('try', rows[0]['address.raw_address']);
    //console.log('aku', rows[0]['address.location'].coordinates[0]);
    var reviewList = [];
    if(rows[0]['review.id'] != undefined){
      for (var i = 0; i < 3; i++) {
        var review = {
          'id' : rows[i]['review.id'],
          'name':rows[i]['review.name'],
          'email':rows[i]['review.email'],
          'content':rows[i]['review.content'],
          'createdAt':moment(rows[i]['review.createdAt']).fromNow(),
          'rating':rows[i]['review.rating'],
          'outlet_id':rows[i].id,
          'outlet_name': rows[i].name
        }
        reviewList.push(review);
        //console.log('revv',reviewList);
      }
      if(rows.length > 3) req.flash('more', 'See more >');
    }
    else req.flash('info', 'Be the first to add review.');
    res.render('guest/detail', {
      title: rows[0].name+' | Outlet Finder', data: reviewList, 
      //data: rows,
      //id:  rows[0].id,
      outlet_name:  rows[0].name, outlet_phone: rows[0].phone_number, outlet_email: rows[0].email, outlet_website: rows[0].website, outlet_desc: rows[0].description, 
      address_id: rows[0].addressId,
      city: rows[0]['address.adm_area_lv2'], 
      //city: rows[0]['business.address.adm_area_lv2'],
      outlet_address: rows[0]['address.formatted_address'],
      lat: rows[0]['address.location'].coordinates[0], lng: rows[0]['address.location'].coordinates[1],
      businessId:rows[0].businessId, business_name: rows[0]['business.name'],
      business_email: rows[0]['business.email'],
      business_phone: rows[0]['business.phone_number'],
      business_website: rows[0]['business.website'],
      business_desc: rows[0]['business.description'],
      business_address: rows[0]['business.address.formatted_address'],
      path: rows[0]['business.file.path'], file_name: rows[0]['business.file.name'], 
      //category: 
      'info': req.flash('info'), 'more': req.flash('more'), 
    })
  }).catch(err => {
    console.error(err);
  });
  //res.render('guest/detail', { title: 'Detail Outlet | Oulet Finder' });
});

// router.get('/login', function(req, res, next) {
//   res.render('login/login-regist', { title: 'LOGIN' });
// });

module.exports = router;
