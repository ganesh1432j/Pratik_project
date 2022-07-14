const config = require('../config.json');

const Sequelize = require('sequelize');

 

    // you can configure your DB credentials in 'config.json'

const host = config.database.host;

const database = config.database.database;

const userName = config.database.user;

const password = config.database.password;

 

// local DB is connecting using 'Sequelize'

const sequelize = new Sequelize(database, userName, password, {

    host: host,

    dialect: 'mysql',

    logging: false,

});

 

sequelize.authenticate().then(() => console.log("Database connected"))

.catch(err => console.log("Error connecting database " + err));

 

module.exports = sequelize;

global.Sequelize = Sequelize;