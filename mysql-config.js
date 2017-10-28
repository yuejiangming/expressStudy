var mysql = require('mysql');
var mysqlConfig = require('./node-config');
var pool = mysql.createPool(mysqlConfig.mysql);

module.exports = pool;
