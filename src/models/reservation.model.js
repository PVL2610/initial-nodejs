const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');
const Room = require('./room.model');
const Hotel = require('./hotel.model');

const Reservation = sequelize.define(
  'Reservation',
  {
    reservation_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    room_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Room,
        key: 'room_id',
      },
    },
    checkin_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    checkout_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('confirmed', 'cancelled', 'completed'),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

Reservation.belongsTo(Room, { foreignKey: 'room_id' });
Room.hasMany(Reservation, { foreignKey: 'room_id' });

Reservation.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Reservation, { foreignKey: 'user_id' });
module.exports = Reservation;
