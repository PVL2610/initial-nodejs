const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define(
  'Role',
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Role;
