const { use } = require('passport');
const User = require('../models/user.model');

async function getUserById(userId) {
    return await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
    });
}

// Method để tìm user theo email
async function findByEmail(email) {
    return await User.findOne({ where: { email } });
};

// Method để tạo user Facebook
async function createFacebookUser(facebookUser, role_id = 3) {
  return await User.create({
    name: facebookUser.name,
    email: facebookUser.email,
    password: null,
    role_id
  });
};

module.exports = {
    getUserById,
    findByEmail,
    createFacebookUser,
};
