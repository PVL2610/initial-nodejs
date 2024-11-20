const { where } = require('sequelize');
const User = require('../models/user.model');

async function createAdmin(admin) {
  const { role_id = 2 } = admin;
  const newAdmin = { ...admin, role_id };
  return await User.create(newAdmin);
}
async function editAdmin(admin) {
  const { user_id, ...updatedAdmin } = admin;
  return await User.update(updatedAdmin, {
    where: { user_id: user_id },
  });
}
async function deleteAdmin(admin_id) {
  const admin = User.findByPk(admin_id);
  if (!admin) {
    throw new Error('Admin not found');
  }
  if (admin.role_id !== 2) {
    throw new Error('Only admins can be deleted');
  }
  return await admin.destroy();
}

module.exports = {
  createAdmin,
  editAdmin,
  deleteAdmin,
};
