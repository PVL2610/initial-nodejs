const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./role.model');
const bcrypt = require('bcrypt'); 

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(20),
    },
    address: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role_id: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
        references: {
            model: Role,
            key: 'role_id',
        },
    },
}, {
    timestamps: false, 
});

User.belongsTo(Role, { foreignKey: 'role_id' });

User.beforeCreate(async (user) => {
    if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    }
});


module.exports = User;
