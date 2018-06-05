var express = require('express');
var router = express.Router();
const connection = require('../src/db-connect');
const alert = require('alert-node');
const config = require ('../conf/config.js')
const Sequelize = require('sequelize');
const models = require('../src/models');
const bcrypt = require('bcrypt-nodejs');
const user = models.user;
const review = models.review;
const async = require('async');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


/* GET users listing. */
router.get('/review', function(req, res, next) {
  res.redirect('/')
});

router.post('/add_review', function(req, res, next) {
  // var name = req.body.name;
  // var email = req.body.email;
  // var review_content = req.body.review_content;
  // var rating = req.body.rating;
  // var data = {
  //   name : name, email : email, content : review_content, rating : rating
  // }
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      var name = req.body.name;
      var email = req.body.email;
      var review_content = req.body.review_content;
      var rating = req.body.rating;
      var data = {
        name : name, email : email, content : review_content, rating : rating, 
        outletId: req.params.id
      }

      review.create(data).then(function(rows, err) {
        console.log('sudah input')
        done(err, token, rows)
      })
    },
    function(token, rows, done) {
      var mailOptions = {
        to: rows.email,
        from: config.review.from,
        subject: config.review.subject_review,
        text: config.review.text_review1 + 'http://' + req.headers.host + '/review/confirm/' + rows.id + '\n\n' + config.review.text_review2
      };
      sgMail.send(mailOptions);
      alert('Please check your email to confirm !')
      res.redirect('/')
    }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/');
    });
})

router.get('/review/confirm/:id', function(req, res, next) {
  console.log('email di email', req.params.id)
  review.findOne({
    where : {
      id : req.params.id
    }
  }).then(function(rows, err){
    review.update({
      status : '1'
    }, {
      where : {
        id : req.params.id
      }
    }).then(rows => {
      alert('thank you !')
    })
  })
})



module.exports = router;
