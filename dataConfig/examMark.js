const Sequelize = require('sequelize');
const sequelize = require('./index');

const examMark = sequelize.define('examMarks', {
  subjectName: Sequelize.STRING,
  mark: Sequelize.STRING,
  person: Sequelize.STRING,
});

examMark.sync();

module.exports = examMark;