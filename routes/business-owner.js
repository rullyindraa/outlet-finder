var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const models = require('../src/models');
const config = require ('../conf/config.js')
const category = models.category;
const address = models.address;
const business = models.business;
const file = models.file;
const helper_category = models.helper_category;
const outlet = models.outlet;
const page_view = models.page_view;
const user = models.user;
const validateJoi = require('../src/validation/create-business');
var multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/files/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	}
})

const upload = multer({storage: storage});

router.get('/', function(req, res) {
  res.render('business-owner/index', { title: 'Dashboard | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`], active1: 'active-navbar' });
});

router.get('/business', function(req, res) {
  business.findAll(
    {
    where: {
      // userId:1
      userId: req.user.id
    },
    attributes: ['id',['name', 'business'],
    [Sequelize.fn('GROUP_CONCAT', Sequelize.literal("categories.name SEPARATOR ', '")), 'category_names'],
    [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col("outlet.businessId"))), 'count_outlet']
    ],
    // distinct: true,
    group: ['business.id'],
    include: [
      {
        model: category,
        attributes: ['name']
      },
      {
        model: outlet,
        attributes: ['id'],
        // distinct: ['businessId'],
        // attributes: [[Sequelize.fn('COUNT', Sequelize.col("outlet.businessId")), 'count_outlet']],
        group: ['id']
      }
    ],
    
    raw:true
  }).then(rows => {
    console.log(rows);
    res.render('business-owner/business', {title: 'Business Lists | Outlet Finder', data:rows, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]});
  })
});

router.get('/business/create-business', function(req, res) {
  category.findAll()
  .then(rows => {
    res.render('business-owner/create-business', {title: 'Create Business | Outlet Finder', Categories:rows, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]});
  })
});

router.post('/business/create-business', upload.single('photo'), function(req, res){
  var target_path = './public/files/' + req.file.filename;

  validateJoi.validate({ category: req.body.category, name: req.body.name, 
    email: req.body.email, phone_number: req.body.phone_number, website: req.body.website, 
    description: req.body.description, line1: req.body.line1, line2: req.body.line2,
    adm_area_lv1: req.body.adm_area_lv1, adm_area_lv2: req.body.adm_area_lv2, 
    adm_area_lv3: req.body.adm_area_lv3, adm_area_lv4: req.body.adm_area_lv4, 
    postal_code: req.body.postal_code, lat: req.body.lat, lng: req.body.lng}, function(errors, value) {
      console.log(errors);
      if (!errors) {
        address.create({
          line1: req.body.line1, 
          line2: req.body.line2,
          adm_area_lv1: req.body.adm_area_lv1, 
          adm_area_lv2: req.body.adm_area_lv2, 
          adm_area_lv3: req.body.adm_area_lv3, 
          adm_area_lv4: req.body.adm_area_lv4, 
          raw_address: req.body.line1+ ` ` +req.body.line2,
          formatted_address: req.body.formatted_address,
          postal_code: req.body.postal_code,
          country: req.body.country,
          //Sequelize.fn('ST_GeomFromText', 'POINT(-7.778737 110.389407)')
          location: Sequelize.fn('ST_GeomFromText', `POINT(`+req.body.lat+` `+req.body.lng+`)`)
        }, {
          include: [{
            model: business
          }]
        }
      )
      .then(row => {
        file.create({
          relative_path: target_path,
          original_name: !req.file ? 'placeholder.jpg' : req.file.filename,
          mime_type : req.file.mimetype
        }, {
          include: [{
            model: business
          }]
        })
        .then(row => {
          console.log(row);
          console.log(req.file);
          business.create({
            userId: req.user.id,
            name: req.body.name,
            addressId: row.id,
            fileId: row.id,
            email: req.body.email,
            phone_number: req.body.phone_number,
            website: req.body.website,
            description: req.body.description
          }, {
            include: [{
              model: helper_category
            }]
          })
          .then(row => {
            console.log(row);
            for (var i=0; i< req.body.category.length; i++){
              helper_category.create({
                categoryId: req.body.category,
                businessId: row.id
              })
            }
            })
          .then(rows => {
            console.log(rows);
            console.log(req.file);
            res.redirect('/business-owner/business');
          })
        }) 
      })
    } else {
      category.findAll()
      .then(rows => {
        //if (err) return err;
        res.render('business-owner/create-business', {title: 'Create Business | Outlet Finder', Categories:rows, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]});
      })
    } 
  })
});

router.get('/business/:id', function(req, res) {
  // category.findAll()
  // .then(rows => {
  //   res.render('business-owner/edit-business', {title: 'Edit Business | Outlet Finder', Categories:rows, name: req.user.first_name});
  // })
  business.findAll({
    where: {
      id: [req.params.id]
    },
    attributes: ['*', ['name', 'b_name']],
    // attributes: ['id', 'name', 'phone_number', 'email', 'website', 'description'],
    include: [
      {
        model: helper_category,
        // attributes: [[Sequelize.fn('GROUP_CONCAT', Sequelize.literal("categories.name SEPARATOR ', '")), 'category_names']],
        include: [
          {
            model: category,
            attributes: ['name']
          }
        ]
        // attributes: ['name']
      },
      {
        model: address
      },
      {
        model: file,
        attributes: ['name', ['relative_path', 'path']]
      }
    ],
    // group: ['business.id'],
    raw:true
  })
  .then(function(rows) {
    console.log(rows);
    res.render('business-owner/edit-business', {
      title: 'Edit Business | Outlet Finder', 
      data: rows,
      name: req.user.first_name + ' ' + req.user.last_name, 
      photo:req.user[`file.pp`],
      active2: 'active-navbar' 
    })
  }).catch(err => {
    console.error(err);
  });
});

router.post('/business/delete/:id', function(req, res, next) {
  business.destroy({
    where: {
      id : [req.params.id]
    }
  }).then(function(err) {
    res.redirect('/business-owner/business')
  })
});

router.get('/outlets', function(req, res) {
  outlet.findAll({
    where: {
      businessId:1
    },
    attributes: [['name', 'outlet_name']],
    include: [
      {
        model: business,
        attributes: [['name', 'business_name']]
      },
      {
        model: address,
        attributes: [['adm_area_lv2', 'city_name']]
      },
      {
        model: page_view,
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('outletId')), 'page_views']]
      }
    ],
    raw: true
  }).then(rows => {
    console.log(rows);
    res.render('business-owner/outlets', { title: 'Outlet Lists | Outlet Finder', data: rows, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`] });
  })
});

router.get('/outlets/create-outlet', function(req, res) {
  res.render('business-owner/create-outlet', { title: 'Create Outlet | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`] });
});

router.get('/reviews', function(req, res) {
  res.render('business-owner/reviews', { title: 'Reviews | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]});
});

module.exports = router;