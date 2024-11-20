const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.post('/create', authenticateToken(1, 2, 3), roomController.createRoom);
router.put('/approve', authenticateToken(1, 2), roomController.approveRoom);

module.exports = router;
