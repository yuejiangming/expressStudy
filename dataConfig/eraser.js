const Sequelize = require('sequelize');
const sequelize = require('./index');
const User = require('./user');

const Eraser = sequelize.define('erasers', {
  name: Sequelize.STRING,
  height: Sequelize.INTEGER,
  width: Sequelize.INTEGER,
});

Eraser.belongsTo(User);
Eraser.sync();

module.exports = Eraser;