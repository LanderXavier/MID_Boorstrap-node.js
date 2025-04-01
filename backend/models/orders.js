const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Orders = sequelize.define('Orders', {
  orderNumber: {
    type: DataTypes.INTEGER,
    allowNull: false, // No puede ser nulo
    autoIncrement: true, // Incremento automático
    primaryKey: true, // Clave primaria
  },
  customer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seller: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Orders.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Orders;
