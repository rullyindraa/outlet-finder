const config = require ('../conf/config')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
	host: config.database.host,
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

sequelize.authenticate()
.then(() => {
	console.log('Connection has been established successfully.');
})
.catch(err => {
	console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;