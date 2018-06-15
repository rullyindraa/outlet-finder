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
const open_hours = models.open_hours;
const moment = require('moment');
const flash = require('connect-flash')
var moment2 = require("moment-business-time")

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
      // {
      //   model: review,
      //   // where: {
      //   //   status: 1
      //   // },
      //   //order: ['id', 'ASC'],
      //   //limit: 3,
      // },
      {
        model: open_hours
      },
    ],
    // order: [
    //   [ review, 'createdAt', 'DESC' ]
    // ],
    raw:true
  })
  .then(rows => {
    review.findAll({
      where: {
        //outletId: req.params.id
        [Sequelize.Op.and]: [
          {
            outletId: [req.params.id]
          }, {
            status: 1
          }
        ]
      },
      order: [['id', 'DESC']],
      //limit: 3
      raw:true
    })
    .then(review => {
      // console.log('inioutlet',rows);
      // console.log('itu', review);
    // console.log('try', rows[0]['address.raw_address']);
    // console.log('aku', rows[0]['address.location'].coordinates[0]);
      var reviewList = [];
      if(review.length !== 0){
        if (review.length > 3){
          for (var i = 0; i < 3; i++) {
            var reviews = {
              'id' : review[i].id,
              'name': review[i].name,
              'email': review[i].email,
              'content':review[i].content,
              'createdAt': moment(review[i].createdAt).fromNow(),
              'rating': review[i].rating,
              // 'outlet_id': review[i].id,
              // 'outlet_name': rows[0].name
            }
            reviewList.push(reviews);
          }
          req.flash('more', 'See more >');
        } 
        else {
          for (var i = 0; i < review.length; i++) {
            var reviews = {
              'id' : review[i].id,
              'name': review[i].name,
              'email': review[i].email,
              'content':review[i].content,
              'createdAt': moment(review[i].createdAt).fromNow(),
              'rating': review[i].rating,
              // 'outlet_id': rows[i].id,
              // 'outlet_name': rows[i].name
            }
            reviewList.push(reviews);
            //console.log('revv',reviewList);
          }
          //req.flash('more', 'See more >');
        }
        //if(review.length > 3) req.flash('more', 'See more >');
      }
      else req.flash('info', 'Be the first to add review.');
      
      var mon_open=moment(rows[0]['open_hour.mon_open'], 'HH:mm:ss').format('H.mm'),
        mon_close=moment(rows[0]['open_hour.mon_close'], 'HH:mm:ss').format('H.mm'),
        tue_open=moment(rows[0]['open_hour.tue_open'], 'HH:mm:ss').format('H.mm'),
        tue_close=moment(rows[0]['open_hour.tue_close'], 'HH:mm:ss').format('H.mm'),
        wed_open=moment(rows[0]['open_hour.wed_open'], 'HH:mm:ss').format('H.mm'),
        wed_close=moment(rows[0]['open_hour.wed_close'], 'HH:mm:ss').format('H.mm'),
        thu_open=moment(rows[0]['open_hour.thu_open'], 'HH:mm:ss').format('H.mm'),
        thu_close=moment(rows[0]['open_hour.thu_close'], 'HH:mm:ss').format('H.mm'),
        fri_open=moment(rows[0]['open_hour.fri_open'], 'HH:mm:ss').format('H.mm'),
        fri_close=moment(rows[0]['open_hour.fri_close'], 'HH:mm:ss').format('H.mm'),
        sat_open=moment(rows[0]['open_hour.sat_open'], 'HH:mm:ss').format('H.mm'),
        sat_close=moment(rows[0]['open_hour.sat_close'], 'HH:mm:ss').format('H.mm'),
        sun_open=moment(rows[0]['open_hour.sun_open'], 'HH:mm:ss').format('H.mm'),
        sun_close=moment(rows[0]['open_hour.sun_close'], 'HH:mm:ss').format('H.mm');
        console.log(reviewList);
      // var status = moment().isWorkingTime();
      // console.log('status',status);
      var now = moment().format('H.mm');
      // console.log('now',now);
      // console.log(moment(now).isBetween(mon_open, mon_close));
      if (moment(now).isBetween(mon_open, mon_close)) var status="Open Now";
      else var status = "Close Now";
      res.render('guest/detail', {
        title: rows[0].name+' | Outlet Finder', data: reviewList, 
        //data: rows,
        status:status,
        id:  rows[0].id,
        outlet_name:  rows[0].name, outlet_phone: rows[0].phone_number, outlet_email: rows[0].email, outlet_website: rows[0].website, outlet_desc: rows[0].description, 
        address_id: rows[0].addressId,
        city: rows[0]['address.adm_area_lv2'], 
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
        //openhour
        mon_open: mon_open, mon_close: mon_close, 
        tue_open: tue_open, tue_close: tue_close, 
        wed_open: wed_open, wed_close: wed_close, 
        thu_open: thu_open, thu_close: thu_close, 
        fri_open: fri_open, fri_close: fri_close, 
        sat_open: sat_open, sat_close: sat_close, 
        sun_open: sun_open, sun_close: sun_close, 
        'info': req.flash('info'), 'more': req.flash('more'), 
      })
    }).catch(err => {
      console.error(err);
    });
  })
    
  //res.render('guest/detail', { title: 'Detail Outlet | Oulet Finder' });
});

router.get('/more-reviews/:id', function(req, res, next) {
  review.findAll({
    where: {
      //outletId: req.params.id
      [Sequelize.Op.and]: [
        {
          outletId: [req.params.id]
        }, {
          status: 1
        }
      ]
    },
    order: [['id', 'DESC']],
    include: [{
      model:outlet,
      attributes:['id', 'name'],
    }],
    //limit: 3
    raw:true
  })
  .then(rows => {
    var reviewList = [];
    for (var i=0; i<rows.length; i++){
      var created = moment(rows[i].createdAt).fromNow();
      var help = Object.assign({created}, rows[i]);
      reviewList.push(help);
    }
    console.log(reviewList);
    // console.log('ini', help);
    res.render('guest/more-reviews', { title: 'More Reviews' , data:reviewList});
  })
  
});

module.exports = router;
