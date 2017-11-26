const Sequelize = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('users', {
  userName: Sequelize.STRING,
  password: Sequelize.STRING,
  tel: Sequelize.STRING,
});
// User.hasOne(Eraser, {foreignKey: 'u_id'});

User.sync();

module.exports = User;