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
const review = models.review;
const open_hours = models.open_hours;
const op_time = models.op_time;
const validateJoi = require('../src/validation/create-business');
var multer = require('multer');
const path = require('path');
const moment = require('moment');
var fs = require('fs');
var faker = require('faker');
const flash = require('connect-flash');
const Op = Sequelize.Op;
faker.locale = "id_ID";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/files/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	}
})

function fileFilter(req, file, cb) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' ) {
      console.log('File type is not supported');
      cb(new Error('File type is not supported'));
      return cb(null, false);
      
  }
  if ( file.size > 5000 ){
      console.log('File is too large');
      cb(new Error('File is too large.'));
      return cb(null, false);
  }
  cb(null, true);
}

//const upload = multer({storage: storage});
//var upload = multer({storage: storage, fileFilter: fileFilter});
var upload = multer({storage: storage, fileFilter: fileFilter}).single('photo');
router.get('/', function(req, res) {
  business.findAndCountAll(
    {
    where: {
      userId: req.user.id
    },
    attributes: [
      'id',['name', 'business'],
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
          }
        ],
      }
    ],
    distinct:true,
    raw:true
  })
  .then(result => {
    console.log('ini', result);
    if (result.count == 0){
      var rows = 0,
        count = 0,
        count_review = 0;
    }
    else {
      var rows = result.rows[0].count_outlet,
        count = result.count,
        count_review= result.rows[0].count_review;
    }

    res.render('business-owner/index', {
      title: 'Dashboard | Outlet Finder', 
      totalo:rows, totalb: count, 
      totalr:count_review,
      name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`],
      active1: 'active-navbar'
    });
  })
});

router.get('/business', function(req, res) {
  business.findAll(
    {
    where: {
      userId: req.user.id
    },
    attributes: ['id',['name', 'business'],
    [Sequelize.fn('GROUP_CONCAT', Sequelize.literal("DISTINCT(categories.name) SEPARATOR ', '")), 'category_names'],
    [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col("outlet.id"))), 'count_outlet']
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
        // attributes: ['id'],
        // distinct: ['businessId'],
        // attributes: [[Sequelize.fn('COUNT', Sequelize.col("outlet.businessId")), 'count_outlet']],
        group: ['businessId']
      }
    ],
    raw:true
  }).then(rows => {
    category.findAll()
    .then(cat => {
      //console.log('ini',rows);
      //console.log('itu',cat);
      console.log('worki',req.params.id);
      res.render('business-owner/business', {title: 'Business Lists | Outlet Finder', data:rows, categories: cat, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]});
    })
  })
});

var businessfake = {
  name: faker.company.companyName(),
  email: faker.internet.email(),
}

router.get('/business/create-business', function(req, res) {
  category.findAll()
  .then(rows => {
    res.render('business-owner/create-business', {
      'error': req.flash('error'),
      data:businessfake,
      title: 'Create Business | Outlet Finder', Categories:rows, active3: 'active-navbar', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]});
  })
});

// router.post('/business/create-business', upload.single('photo'), function(req, res){
router.post('/business/create-business', function(req, res){
  upload(req, res, function (err) {
    if (err) {
      res.render('error', {message: err})
    }
    validateJoi.validate({ 
      // category: req.body.category, 
      name: req.body.name, 
      email: req.body.email, phone_number: req.body.phone_number, website: req.body.website, 
      description: req.body.description, 
      // line1: req.body.line1, line2: req.body.line2,
      // adm_area_lv1: req.body.adm_area_lv1, adm_area_lv2: req.body.adm_area_lv2, 
      // adm_area_lv3: req.body.adm_area_lv3, adm_area_lv4: req.body.adm_area_lv4, 
      // postal_code: req.body.postal_code, 
      formatted_address: req.body.formatted_address,
      lat: req.body.lat, lng: req.body.lng}, function(errors, value) {
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
        .then(address => {
          if (req.file !== undefined){
            var name = req.file.filename,
              relative_path = '/files/' + req.file.filename,
              original_name = !req.file ? 'placeholder.jpg' : req.file.originalname,
              mime_type = req.file.mimetype;
          }
          else {
            var name = null,
              relative_path = 'http://www.morpho.pl/en/wp-content/uploads/2015/06/icon_nologo_black.png',
              original_name = null,
              mime_type = null;
          }
          file.create({
            name: name,
            relative_path: relative_path,
            original_name: original_name,
            mime_type : mime_type
          }, {
            include: [{
              model: business
            }]
          })
          .then(file => {
            // console.log(row);
            // console.log(req.file);
            business.create({
              userId: req.user.id,
              name: req.body.name,
              addressId: address.id,
              fileId: file.id,
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
              for(var i = 0; i < req.body.category.length; i++ ) {
                helper_category.create({
                  categoryId: req.body.category[i],
                  businessId: row.id
                })
              }
            })
            .then(rows => {
              console.log(rows);
              res.redirect('/business-owner/business');
            })
          }) 
        })
      } else {
        category.findAll()
        .then(rows => {
          req.flash('error', 'Field is required.');
          res.render('business-owner/create-business', {
            'error': req.flash('error'), 
            data:businessfake,
            title: 'Create Business | Outlet Finder', Categories:rows, active3: 'active-navbar', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]});
          // res.redirect('/business-owner/business/create-business');
        })
      } 
    })
  })
});

router.get('/business/:id', function(req, res) {
  // category.findAll()
  // .then(rows => {
  //   res.render('business-owner/edit-business', {title: 'Edit Business | Outlet Finder', Categories:rows, name: req.user.first_name});
  // })
  business.findAll({
    where: {
      //id: [req.params.id]
      [Sequelize.Op.and]: [
        {
          id: [req.params.id]
        }, {
          userId: req.user.id
        }
      ]
    },
    // attributes: ['*', ['name', 'b_name']],
    attributes: ['id', 'name', 'phone_number', 'email', 'website', 'description', 
    [Sequelize.fn('GROUP_CONCAT', Sequelize.literal("DISTINCT(categories.id) SEPARATOR ','")), 'category_id'],],
    group: ['business.id'],
    include: [
      {
        model: category,
        attributes: ['id']
      },
      {
        model: outlet,
        group: ['businessId']
      },
      {
        model: address
      },
      {
        model: file,
        attributes: ['id', 'name', ['relative_path', 'path']]
      }
    ],
    distinct: true,
    raw:true
  })
  .then(rows => {
    category.findAll()
    .then(cat => {
      console.log('ini',rows);
      // console.log('itu', cat);
      // console.log('try', rows[0]['address.raw_address']);
      //console.log('aku', rows[0]['address.location'].coordinates[0]);
      res.render('business-owner/edit-business', {
        title: 'Edit Business | Outlet Finder', 
        //data: rows,
        id:  rows[0].id,
        business_name:  rows[0].name, phone_number: rows[0].phone_number, email: rows[0].email, website: rows[0].website, description: rows[0].description, 
        path: rows[0]['file.path'], file_name: rows[0]['file.name'], Fid: rows[0]['file.id'],
        address_id: rows[0]['address.id'],
        raw_address: rows[0]['address.raw_address'], 
        country: rows[0]['address.country'],
        postal_code: rows[0]['address.postal_code'],
        line1: rows[0]['address.line1'], line2: rows[0]['address.line2'],
        adm_area_lv1: rows[0]['address.adm_area_lv1'], adm_area_lv2: rows[0]['address.adm_area_lv2'], adm_area_lv3: rows[0]['address.adm_area_lv3'], adm_area_lv4: rows[0]['address.adm_area_lv4'],
        formatted_address: rows[0]['address.formatted_address'],
        lat: rows[0]['address.location'].coordinates[0], long: rows[0]['address.location'].coordinates[1],
        categories: cat,
        valCat: rows[0].category_id,
        active3: 'active-navbar',
        name: req.user.first_name + ' ' + req.user.last_name, 
        photo:req.user[`file.pp`]
      })
    }).catch(err => {
      //console.error('ikierr2', err);
      var message = 'Restricted. Access Denied'
      res.render('error', {message: message})
    });
  }).catch(err => {
    console.error('ikierr3', err);
  });
});

//editbisnis
// router.post('/business/edit-business', upload.single('photo'), function(req, res){
router.post('/business/edit-business', upload, function(req, res){
  // var target_path = '/files/' + req.file.filename;

  validateJoi.validate({ 
    name: req.body.name, 
    email: req.body.email, phone_number: req.body.phone_number, website: req.body.website, 
    description: req.body.description, 
    // line1: req.body.line1, line2: req.body.line2,
    // adm_area_lv1: req.body.adm_area_lv1, adm_area_lv2: req.body.adm_area_lv2, 
    // adm_area_lv3: req.body.adm_area_lv3, adm_area_lv4: req.body.adm_area_lv4, 
    // postal_code: req.body.postal_code, 
    formatted_address: req.body.formatted_address,
    lat: req.body.lat, lng: req.body.lng}, function(errors, value) {
      console.log(errors);
      if (!errors) {
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
                id: req.body.Fid
              }
            },
            {
              include: [{
                model: business
              }]
            }
          )
          .then(row => {
            address.update({
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
              location: Sequelize.fn('ST_GeomFromText', `POINT(`+req.body.lat+` `+req.body.lng+`)`),
              updatedAt: new Date()
            }, {
              where: {
                id: req.body.address_id
              }
            }
          )
          .then(rows => {
            business.update({
              name: req.body.name,
              //addressId: row.id,
              //fileId: row.id,
              email: req.body.email,
              phone_number: req.body.phone_number,
              website: req.body.website,
              description: req.body.description,
              updatedAt: new Date()
            }, 
            {
              where: {
                id: req.body.Bid
              }
            })
          })
          .then(rows => {
            console.log(rows);
            res.redirect('/business-owner/business');
          }).catch(err => {
            console.error('errpostnya', err);
          });
        })
      }
        
        address.update({
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
          location: Sequelize.fn('ST_GeomFromText', `POINT(`+req.body.lat+` `+req.body.lng+`)`),
          updatedAt: new Date()
        }, {
          where: {
            id: req.body.address_id
          }
        }
      )
      .then(rows => {
        business.update({
          name: req.body.name,
          //addressId: row.id,
          //fileId: row.id,
          email: req.body.email,
          phone_number: req.body.phone_number,
          website: req.body.website,
          description: req.body.description,
          updatedAt: new Date()
        }, 
        {
          where: {
            id: req.body.Bid
          }
        })
        .then(rows => {
          console.log(rows);
          res.redirect('/business-owner/business');
        }).catch(err => {
          console.error('errpostnya', err);
        })
      }) 
      //})
    } else {
      category.findAll()
      .then(rows => {
        //if (err) return err;
        res.render('business-owner/create-business', {title: 'Create Business | Outlet Finder', categories:rows, active3: 'active-navbar', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]});
      }).catch(err => {
        console.error('error', err);
      })
    } 
  })
});

router.post('/business/delete/:id', function(req, res, next) {
  business.destroy({
    where: {
      //id : [req.params.id],
      [Sequelize.Op.and]: [
        {
          id: [req.params.id]
        }, {
          userId: req.user.id
        }
      ]
    },
  }).then(function(err) {
    res.redirect('/business-owner/business')
  })
});

router.get('/outlet', function(req, res) {
  outlet.findAll({
    attributes: ['id', ['name', 'outlet_name'],
    [Sequelize.fn('COUNT', Sequelize.col("page_view.id")), 'count_view']],
    // attributes: {
    //   include: [[Sequelize.fn('COUNT', Sequelize.col('outletId')), 'page_views']]
    // },
    group: ['outlet.id'],
    include: [
      {
        model: business,
        where: {
          userId: req.user.id
        },
        attributes: [['name', 'business_name']],
        required:true
      },
      {
        model: address,
        attributes: [['adm_area_lv2', 'city_name']]
      },
      {
        model: page_view,
        
        // attributes: [[Sequelize.fn('COUNT', Sequelize.col('outletId')), 'page_views']],
        //[[Sequelize.fn('IFNULL', Sequelize.fn('COUNT', Sequelize.col('outletId')), 0), 'page_views']],
        // include: [outlet]
        group: ['outletId'],
        //required: false,
      },
    ],
    raw: true
  })
  .then(rows => {
    category.findAll()
    .then(cat => {
      // console.log(rows);
      res.render('business-owner/outlets', { title: 'Outlet Lists | Outlet Finder', 
      data: rows,
      active4: 'active-navbar', categories: cat, 
      name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`],
      'info': req.flash('info')
    });
    })
  }).catch(err => {
    console.error('countb',err);
    res.send('error');
  })
});

router.get('/oulet/business/:id', function(req, res){
  outlet.findAll({
    where: {
      businessId: [req.params.id]
      // [Sequelize.Op.and]: [
      //   {
      //     businessId: [req.params.id]
      //   }, {
      //     userId: req.user.id
      //   }
      // ]
    },
    attributes: ['id', ['name', 'outlet_name'],
    [Sequelize.fn('COUNT', Sequelize.col("page_view.id")), 'count_view']],
    group: ['outlet.id'],
    include: [
      {
        model: business,
        // where: {
        //   userId: [req.user.id]
        // },
        attributes: [['name', 'business_name'], 'userId'],
        //required:true
      },
      {
        model: address,
        attributes: [['adm_area_lv2', 'city_name']]
      },
      {
        model: page_view,
        group: ['outletId'],
        // attributes: [[Sequelize.fn('IFNULL', Sequelize.fn('COUNT', Sequelize.col('outletId')), 0), 'page_views']],
        // include: [outlet]
      }
    ],
    raw: true
  })
  .then(rows => {
    category.findAll()
    .then(cat => {
      console.log(rows);
      res.render('business-owner/outlets', { title: 'Outlet Lists | Outlet Finder', data: rows, active4: 'active-navbar', categories: cat, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`] });
    })
  }).catch(err => {
    console.error('countb',err);
    res.send('error');
  })
});

router.get('/outlet/create-outlet', function(req, res) {
  business.findAll({
    where: {
      userId: req.user.id
    }
  })
  .then(rows => {
    res.render('business-owner/create-outlet2', { title: 'Create Outlet | Outlet Finder', active4: 'active-navbar', business: rows, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`] });
  })
});

router.post('/outlet/create-outlet', function(req, res){
  upload(req, res, function (err) {
    if (err) {
      res.render('error', {message: err})
    }
    validateJoi.validate({ 
      // category: req.body.category, 
      name: req.body.name, 
      email: req.body.email, phone_number: req.body.phone_number, website: req.body.website, 
      description: req.body.description, 
      formatted_address: req.body.formatted_address,
      lat: req.body.lat, lng: req.body.lng}, function(errors, value) {
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
              model: outlet
            }]
          }
        )
        .then(address => {
          if (req.file !== undefined){
            var name = req.file.filename,
              relative_path = '/files/' + req.file.filename,
              original_name = !req.file ? 'placeholder.jpg' : req.file.originalname,
              mime_type = req.file.mimetype;
          }
          else {
            var name = null,
              relative_path = 'http://www.morpho.pl/en/wp-content/uploads/2015/06/icon_nologo_black.png',
              original_name = null,
              mime_type = null;
          }
          file.create({
            name: name,
            relative_path: relative_path,
            original_name: original_name,
            mime_type : mime_type
          }, {
            include: [{
              model: outlet
            }]
          })
          .then(file => {
            // console.log(row);
            // console.log(req.file);
            outlet.create({
              businessId: req.body.business,
              name: req.body.name,
              addressId: address.id,
              fileId: file.id,
              email: req.body.email,
              phone_number: req.body.phone_number,
              website: req.body.website,
              description: req.body.description,
              close_on_public_holiday: req.body.public_holiday
            }, {
              include: [{
                model: open_hours
              }]
            })
            .then(row => {
              for (var i = 1; i < 8; i++){
                op_time.create({
                  outletId: row.id,
                  day: ''+i,
                  open_time: req.body.open[i],
                  close_time: req.body.close[i],
                  // day: '1',
                  // open_time: req.body.open1,
                  // close_time: req.body.close1,
                })
                // console.log(req.body.open_i);
                // console.log(req.body.open+i);
              }
            })
            .then(rows => {
              console.log(rows);
              console.log(req.body.public_holiday);
              req.flash('info', 'New Outlet Added');
              res.redirect('/business-owner/outlet');
            })
          }) 
        })
      } else {
        business.findAll({
          where: {
            userId: req.user.id
          }
        })
        .then(rows => {
          res.render('business-owner/create-outlet', { title: 'Create Outlet | Outlet Finder', active4: 'active-navbar', business: rows, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`] });
        })
      } 
    })
  })
});

router.post('/outlet/delete/:id', function(req, res, next) {
  outlet.destroy({
    where: {
      id : [req.params.id]
    }
  }).then(function(err) {
    res.redirect('/business-owner/outlets')
  })
});

router.get('/outlet/:id', function(req, res) {
  outlet.findAll({
    where: {
      id: [req.params.id]
    },
    include: [
      {
        model: business,
        attributes: ['id','name']
      },
      {
        model: address
      },
      {
        model: file,
        attributes: ['name', ['relative_path', 'path']]
      }
    ],
    raw:true
  })
  .then(rows => {
    business.findAll({
      where: {
        userId: req.user.id
      }
    })
    .then(bus => {
      op_time.findAll({
        where: {
          outletId: req.params.id,
        },
        raw:true
      })
      .then(op_time => {
        var opList = [];
        for (var i = 0; i < op_time.length; i++) {
          var days = moment().isoWeekday(i+1).format('dddd'); 
          if (op_time[i].open_time != null){
            var open = moment(op_time[i].open_time, 'HH:mm:ss').format('HH:mm');
            var close = moment(op_time[i].close_time, 'HH:mm:ss').format('HH:mm');
            var help = Object.assign({days, open, close}, op_time[i]);
          }
          else {
            var open = null;
            var close = null;
            var help = Object.assign({days, open, close}, op_time[i]);
          }
          opList.push(help);
        }
        console.log('oplis',opList);
        // console.log('inioutlet',rows);
        
        
        res.render('business-owner/edit-outlet', {
          title: 'Edit Outlet | Outlet Finder', 
          //data: rows,
          data: opList,
          id:  rows[0].id, holiday: rows[0].close_on_public_holiday,
          outlet_name:  rows[0].name, phone_number: rows[0].phone_number, email: rows[0].email, website: rows[0].website, description: rows[0].description, 
          path: rows[0]['file.path'], file_name: rows[0]['file.name'], file_id: rows[0].fileId,
          address_id: rows[0].addressId,
          raw_address: rows[0]['address.raw_address'], 
          line1: rows[0]['address.line1'], line2: rows[0]['address.line2'],
          adm_area_lv1: rows[0]['address.adm_area_lv1'], adm_area_lv2: rows[0]['address.adm_area_lv2'], adm_area_lv3: rows[0]['address.adm_area_lv3'], adm_area_lv4: rows[0]['address.adm_area_lv4'],
          formatted_address: rows[0]['address.formatted_address'],
          lat: rows[0]['address.location'].coordinates[0], long: rows[0]['address.location'].coordinates[1],
          businessId:rows[0].businessId, business_name: rows[0]['business.name'],
          active4: 'active-navbar',
          business: bus,
          name: req.user.first_name + ' ' + req.user.last_name, 
          photo:req.user[`file.pp`]
        })
      })
    }).catch(err => {
      console.error(err);
    });
  })
});

router.post('/outlet/edit-outlet', upload, function(req, res){
  validateJoi.validate({ 
    name: req.body.name, 
    email: req.body.email, phone_number: req.body.phone_number, website: req.body.website, 
    description: req.body.description, 
    formatted_address: req.body.formatted_address,
    lat: req.body.lat, lng: req.body.lng}, function(errors, value) {
      console.log(errors);
      if (!errors) {
        if (req.file) {
          if (req.body.old_photo !== '') fs.unlink(`public/files/${req.body.old_photo}`);
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
                id: req.body.file_id
              }
            },
          )
          .then(file => {
            address.update({
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
              location: Sequelize.fn('ST_GeomFromText', `POINT(`+req.body.lat+` `+req.body.lng+`)`),
              updatedAt: new Date()
            }, {
              where: {
                id: req.body.address_id
              }
            }
          )
          .then(address => {
            outlet.update({
              name: req.body.name,
              businessId: req.body.business,
              email: req.body.email,
              phone_number: req.body.phone_number,
              website: req.body.website,
              description: req.body.description,
              close_on_public_holiday: req.body.public_holiday,
              updatedAt: new Date()
            }, 
            {
              where: {
                id: req.body.outlet_id
              }
            })
            .then(outlet => {
              for (var i=1; i<8; i++){
                op_time.update({
                  open_time: req.body.open[i-1],
                  close_time: req.body.close[i-1]
                },
                {
                  where: {
                    [Op.and]: [
                      {
                        outletId: req.body.outlet_id
                      }, {
                        day: [i]
                      }
                    ]
                  }
                })
              }
                
              })
              .then(rows => {
                //console.log(rows);
                req.flash('info', 'Outlet '+req.body.name+' Edited');
                res.redirect('/business-owner/outlet');
              }).catch(err => {
                console.error('errpostnya', err);
              });
            })
          })
      }
        
        address.update({
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
          location: Sequelize.fn('ST_GeomFromText', `POINT(`+req.body.lat+` `+req.body.lng+`)`),
          updatedAt: new Date()
        }, {
          where: {
            id: req.body.address_id
          }
        }
      )
      .then(rows => {
        outlet.update({
          name: req.body.name,
          email: req.body.email,
          phone_number: req.body.phone_number,
          website: req.body.website,
          description: req.body.description,
          businessId: req.body.business,
          close_on_public_holiday: req.body.public_holiday,
          updatedAt: new Date()
        }, 
        {
          where: {
            id: req.body.outlet_id
          }
        })
        .then(outlet => {
          for (var i=0; i<7; i++){
            if(req.body.open[i] !== ''){
              var open_time= req.body.open[i],
              close_time= req.body.close[i];
            }
            else {
              var open_time= null,
              close_time= null;
            }
            
            op_time.update({
              open_time: open_time,
              close_time: close_time
            },
            {
              where: {
                [Op.and]: [
                  {
                    outletId: req.body.outlet_id
                  }, {
                    day: [i+1]
                  }
                ]
              }
            })
          }
        })
        .then(rows => {
          console.log(rows);
          req.flash('info', 'Outlet '+req.body.name+' Edited');
          res.redirect('/business-owner/outlet');
          // res.redirect('/business-owner/outlet/'+req.body.outlet_id);
        }).catch(err => {
          console.error('errpostnya', err);
        })
      }) 
    } else {
      business.findAll({
        where: {
          userId: req.user.id
        }
      })
      .then(rows => {
        //masihbingung
        res.render('business-owner/outlet/:id', {title: 'Create Business | Outlet Finder', categories:rows, active3: 'active-navbar', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]});
      }).catch(err => {
        console.error('error', err);
      })
    } 
  })
});

router.get('/reviews', function(req, res) {
  review.findAll({
    attributes: ['id', 'name', 'email', 'content', 'rating', 'createdAt'],
    // where: {
    //   status: 1
    // },
    include: [
      {
        model: outlet,
        include: [{
          model: business,
          where: {
            userId: req.user.id
          },
          attributes:['id'],
          required: true
        }],
        attributes: ['id',['name', 'outlet_name']],
        required: true
      }
    ],
    order: [
      ['createdAt', 'DESC' ]
    ],
    raw:true
  }).then(rows => {
    business.findAll()
    .then(bus => {
      var reviewList = [];
      for (var i=0; i<rows.length; i++){
        var created = moment(rows[i].createdAt).fromNow();
        var help = Object.assign({created}, rows[i]);
        reviewList.push(help);
      }
      console.log('inireview',reviewList);
      res.render('business-owner/reviews', { 
        title: 'Reviews | Outlet Finder', data: reviewList, 
        business: bus, name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`] 
      });
    })
  })
  // res.render('business-owner/reviews', { title: 'Reviews | Outlet Finder', name: req.user.first_name + ' ' + req.user.last_name, photo:req.user[`file.pp`]});
});

module.exports = router;