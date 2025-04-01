require('dotenv').config();  // Load environment variables from .env file
const { Sequelize } = require('sequelize');

// Load variables from .env file
const sequelize = new Sequelize(
  process.env.DB_NAME,   // Database name
  process.env.DB_USER,   // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,   // Database host
    dialect: 'mysql',            // Use MySQL
  }
);

module.exports = sequelize;