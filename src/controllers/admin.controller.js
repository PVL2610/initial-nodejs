const userService = require('../services/user.service');
const adminService = require('../services/admin.service');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

class adminController {
  async createAdmin(req, res, next) {
    const { name, phone, address, email, password } = req.body;
    try {
      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: req.t('email_already') });
      }
      const newAdmin = { name, phone, address, email, password };
      await adminService.createAdmin(newAdmin);
      res.status(200).json({ message: req.t('create_admin_success') });
    } catch (error) {
      res.status(500).json({ error: req.t('server_error') });
    }
  }
  async editAdmin(req, res, next) {
    const { user_id, name, phone, address, email, password, role_id } =
      req.body;
    try {
      const updatedAdmin = {
        user_id,
        name,
        phone,
        address,
        email,
        password,
        role_id,
      };
      if (password) {
        updatedAdmin.password = await bcrypt.hash(password, 10);
      }
      await adminService.editAdmin(updatedAdmin);
      res.status(200).json({ message: req.t('update_admin_success') });
    } catch (error) {
      res.status(500).json({ error: req.t('server_error') });
    }
  }
  async deleteAdmin(req, res, next) {
    try {
      await adminService.deleteAdmin(req.body.admin_id);
      res.status(200).json({ message: req.t('delete_admin_success') });
    } catch (error) {
      if (error.message === 'Admin not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'Only admins can be deleted') {
        return res.status(403).json({ message: error.message })
        ;
      }
      res.status(500).json({ error: req.t('server_error') });
    }
  }
}
module.exports = new adminController();
