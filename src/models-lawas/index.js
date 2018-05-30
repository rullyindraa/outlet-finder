const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require ('../../conf/config.js');
// const config = require('../config/config')[env];
const db = {};


const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
	host: 'localhost',
	dialect: 'mysql',
	operatorsAliases: false,
	define:{
		timestamps: false,
      freezeTableName: true
	},	
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });
 
Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;
 
module.exports = db;

sequelize.authenticate()
.then(() => {
	console.log('Connection has been established successfully.');
})
.catch(err => {
	console.error('Unable to connect to the database:', err);
});

// module.exports = sequelize;