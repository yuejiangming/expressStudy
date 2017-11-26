const path = require('path');
const Sequelize = require('sequelize');
const mysqlConfig = require(path.join(__dirname, '..', 'config')).database.mysql;

const sequelize = new Sequelize(mysqlConfig.databaseName, mysqlConfig.user, mysqlConfig.password, {
  host: mysqlConfig.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;