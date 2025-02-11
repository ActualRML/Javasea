const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('javasea_mp', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;







