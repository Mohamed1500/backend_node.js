const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});
sequelize.authenticate()
    .then(() => console.log('Verbonden met de database'))
    .catch(err => console.error('Kan geen verbinding maken:', err));

module.exports = sequelize;