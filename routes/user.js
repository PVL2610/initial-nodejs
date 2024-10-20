const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/profile', userController.getProfile);
router.get('/review', userController.getReview);
router.get('/booking', userController.getBooking);
router.get('/room', userController.getRoomBooked);

module.exports = router;