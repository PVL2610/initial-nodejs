const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Hotel = require('./hotel.model');

const Room = sequelize.define(
  'Room',
  {
    room_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Hotel,
        key: 'hotel_id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.FLOAT,
    },
    floor: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.ENUM('single', 'double', 'suite'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('available', 'booked', 'maintenance'),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
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
Hotel.hasMany(Room, { foreignKey: 'hotel_id' });

Room.belongsTo(Hotel, { foreignKey: 'hotel_id' });
module.exports = Room;
