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
        attributes: ['id', 'name', 'description'],
        //group: ['business.id'],
        include: [
          {
            model: file,
            attributes: ['name', ['relative_path', 'path']]
          },
          {
            model: address,
            //attribut: ['formatted_address']
          }
          // {
          //   model: category,
          //   //attributes: ['name']
          //   attributes: [[Sequelize.fn('GROUP_CONCAT', Sequelize.literal("name SEPARATOR ', '")), 'category_names']]
          // }
        ]
      },
      {
        model: address
      }
    ],
    raw:true
  })
  .then(rows => {
    console.log('inioutlet',rows);
    // console.log('itu', cat);
    // console.log('try', rows[0]['address.raw_address']);
    //console.log('aku', rows[0]['address.location'].coordinates[0]);
    res.render('guest/detail', {
      title: rows[0].name+' | Outlet Finder', 
      //data: rows,
      //id:  rows[0].id,
      outlet_name:  rows[0].name, phone_number: rows[0].phone_number, email: rows[0].email, website: rows[0].website, description: rows[0].description, 
      path: rows[0]['business.file.path'], file_name: rows[0]['business.file.name'], 
      address_id: rows[0].addressId,
      raw_address: rows[0]['address.raw_address'], 
      line1: rows[0]['address.line1'], line2: rows[0]['address.line2'],
      adm_area_lv1: rows[0]['address.adm_area_lv1'], adm_area_lv2: rows[0]['address.adm_area_lv2'], adm_area_lv3: rows[0]['address.adm_area_lv3'], adm_area_lv4: rows[0]['address.adm_area_lv4'],
      formatted_address: rows[0]['address.formatted_address'],
      lat: rows[0]['address.location'].coordinates[0], long: rows[0]['address.location'].coordinates[1],
      businessId:rows[0].businessId, business_name: rows[0]['business.name'],
      business_desc: rows[0]['business.description']
      //category: 
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
