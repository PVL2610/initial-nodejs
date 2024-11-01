const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const passport = require('passport'); 

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: name
 *       - in: query
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         description: phone
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: address
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: email
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *           format: password
 *         description: password
 *  
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *       404:
 *         description: Lỗi cú pháp
 *       500:
 *         description: Lỗi server
 */
router.post('/register', userController.register);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: email
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *           format: password
 *         description: password
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       404:
 *         description: Lỗi cú pháp
 *       500:
 *         description: Lỗi server
 */
router.post('/login', userController.login);
/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Đánh giá của người dùng
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi server
 */
router.get('/review', authenticateToken, userController.getReview);
/**
 * @swagger
 * /api/user/booking:
 *   get:
 *     summary: Get user booking
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: Số lượng booking
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
router.get('/booking', authenticateToken, userController.getBooking);

/**
 * @swagger
 * /api/user/room:
 *   get:
 *     summary: Get room booking
 *     security:
 *       - bearerAuth: []
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
router.get('/room', authenticateToken, userController.getRoomBooked);

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Bạn đã truy cập thành công vào route bảo vệ!' });
});
  

module.exports = router;