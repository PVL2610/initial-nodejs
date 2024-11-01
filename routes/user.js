const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const passport = require('passport'); 

router.post('/register', userController.register);
router.post('/login', userController.login);
/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi server
 */
router.get('/profile', authenticateToken, userController.getProfile);

/**
 * @swagger
 * /api/user/review:
 *   get:
 *     summary: Get user review
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Đánh giá của người dùng
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi server
 */
router.get('/review', userController.getReview);
/**
 * @swagger
 * /api/user/booking:
 *   get:
 *     summary: Get user booking
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *         description: ID của người dùng
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin booking
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi server
 */
router.get('/booking', userController.getBooking);

/**
 * @swagger
 * /api/user/room:
 *   get:
 *     summary: Get room booking
 *     parameters:
 *       - in: query
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: reservationId
 *     responses:
 *       200:
 *         description: Booking detail
 *       404:
 *         description: Không tìm thấy reservation
 *       500:
 *         description: Lỗi server
 */
router.get('/room', userController.getRoomBooked);

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Bạn đã truy cập thành công vào route bảo vệ!' });
});
  

module.exports = router;