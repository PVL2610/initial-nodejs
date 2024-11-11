const express = require('express');
const router = express.Router();
const { cacheHotel } = require('../middleware/cache.middleware')

const hotelController = require('../controllers/hotel.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.get('/', authenticateToken(1, 2), hotelController.getHotels);
router.post('/create', authenticateToken(1, 2), hotelController.createHotel);
router.put('/update', authenticateToken(1, 2), hotelController.updateHotel);
router.patch('/approve', authenticateToken(1, 2), hotelController.approveHotel);
router.delete('/delete', authenticateToken(1, 2), hotelController.deleteHotel);
router.get('/:hotel_id',cacheHotel, hotelController.getHotelbyId);

module.exports = router;