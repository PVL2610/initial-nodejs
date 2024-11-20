const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Hotel = sequelize.define(
  'Hotel',
  {
    hotel_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    isApproved: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Hotel;
