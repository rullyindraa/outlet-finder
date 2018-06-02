var express = require('express');
var router = express.Router();
const alert = require('alert-node');
const config = require ('../conf/config.js')
const Sequelize = require('sequelize');
const models = require('../src/models');
const bcrypt = require('bcrypt-nodejs');
const user = models.users;
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
router.get('/detail', function(req, res, next) {
  res.render('guest/detail', { title: 'Detail Outlet | Oulet Finder' });
});

// router.get('/login', function(req, res, next) {
//   res.render('login/login-regist', { title: 'LOGIN' });
// });

module.exports = router;
