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
const op_time = models.op_time;
const moment = require('moment');
const flash = require('connect-flash')
// var moment2 = require("moment-business-time");
const Op = Sequelize.Op;

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
  outlet.findOne({
    where: {
      id: [req.params.id]
    },
    include: [
      {
        model: business,
        attributes: ['id', 'name', 'description', 'email', 'phone_number', 'website',
        [Sequelize.fn('GROUP_CONCAT', Sequelize.literal("`business->categories`.`name` SEPARATOR ', '")), 'category_names']
      ],
        //group: ['business.id'],
        include: [
          {
            model: file,
            attributes: ['name', ['relative_path', 'path']]
          },
          {
            model: address,
            attributes: ['adm_area_lv2', 'formatted_address']
          },
          {
            model: category,
            attributes: ['name']
          }
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
      }
    ],
    // order: [
    //   [ review, 'createdAt', 'DESC' ]
    // ],
    raw:true
  })
  .then(rows => {
    op_time.findAll({
      where: {
        outletId: req.params.id,
      },
      raw:true
    })
    .then(op_time => {
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
      outlet.findAll({
        attributes: ['id', 'name'],
        where: {
          businessId: rows['business.id'],
          [Op.and]: [
            {
              id: { [Op.ne]: [req.params.id] }
            }
          ]
        },
        include: [{
          model: address,
          attributes: [['adm_area_lv2', 'city']]
        }],
        raw: true
      })
      .then(other_outlet => {
        var reviewList = [];
        if(review.length !== 0){
          if (review.length > 3){
            var reviewList = [];
            for (var i = 0; i < 3; i++) {
              var created = moment(review[i].createdAt).fromNow();
              var help = Object.assign({created}, review[i]);
              reviewList.push(help);
            }
            // console.log(reviewList);
            req.flash('more', 'See more >');
          } 
          else {
            var reviewList = [];
            for (var i = 0; i < review.length; i++) {
              var created = moment(review[i].createdAt).fromNow();
              var help = Object.assign({created}, review[i]);
              reviewList.push(help);
            }
            //req.flash('more', 'See more >');
          }
          //if(review.length > 3) req.flash('more', 'See more >');
        }
        else req.flash('info', 'Be the first to add review.');
        
        var opList = [];
        for (var i = 0; i < op_time.length; i++) {
          var days = moment(op_time[i].day, 'e').format('dddd'); 
          if (op_time[i].open_time !== null){
            var open = moment(op_time[i].open_time, 'HH:mm:ss').format('H.mm');
            var close = moment(op_time[i].close_time, 'HH:mm:ss').format('H.mm');
            var help = Object.assign({days, open, close}, op_time[i]);
            opList.push(help);
          }
          // else {
          //   var open = 'closed';
          //   var close = 'closed';
          // }

          // var help = Object.assign({days, open, close}, op_time[i]);
          // opList.push(help);
        }
        // console.log(rows);

        var time = moment(),
          day = moment().day(),
          openTime = moment(op_time[day-1].open_time, 'HH:mm:ss'),
          closeTime = moment(op_time[day-1].close_time, 'HH:mm:ss');

        if (time.isBetween(openTime, closeTime)) {
          console.log('buka');
          var status = "Open Now";
        } else {
          console.log('tutup');
          var status = "Close Now";
        }
        console.log(moment().day(), op_time[moment().day()-1].open_time, op_time[moment().day()-1].close_time, status);
        //console.log(moment().day());
      // console.log(op_time);
        console.log('other', other_outlet);
        res.render('guest/detail-2', {
          title: rows.name+' | Outlet Finder', data: reviewList, op: opList,
          outlet: other_outlet,
          status:status,
          id:  rows.id,
          outlet_name:  rows.name, outlet_phone: rows.phone_number, outlet_email: rows.email, outlet_website: rows.website, outlet_desc: rows.description, 
          address_id: rows.addressId,
          city: rows['address.adm_area_lv2'], 
          outlet_address: rows['address.formatted_address'],
          lat: rows['address.location'].coordinates[0], lng: rows['address.location'].coordinates[1],
          businessId:rows.businessId, business_name: rows['business.name'],
          business_email: rows['business.email'],
          business_phone: rows['business.phone_number'],
          business_website: rows['business.website'],
          business_desc: rows['business.description'],
          business_address: rows['business.address.formatted_address'],
          path: rows['business.file.path'], file_name: rows['business.file.name'], 
          category : rows['business.category_names'],
          'info': req.flash('info'), 'more': req.flash('more'), 
        })
      }).catch(err => {
        console.error(err);
      });
    })
  })
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
