const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Hotel = require('./hotel.model');
const User = require('./user.model');

const HotelReview = sequelize.define(
  'HotelReview',
  {
    review_id: {
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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    rating: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  },
);

HotelReview.belongsTo(Hotel, { foreignKey: 'hotel_id' });
HotelReview.belongsTo(User, { foreignKey: 'user_id' });
module.exports = HotelReview;
