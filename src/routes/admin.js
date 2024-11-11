const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware');
const adminController= require('../controllers/admin.controller');

router.post('/create', authenticateToken(1), adminController.createAdmin);
router.patch('/edit', authenticateToken(1), adminController.editAdmin);
router.delete('/delete', authenticateToken(1), adminController.deleteAdmin);

module.exports = router;