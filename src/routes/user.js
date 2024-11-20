const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/auth.middleware');
const passport = require('passport');

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên của người dùng
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 description: Số điện thoại
 *                 example: 123456789
 *               address:
 *                 type: string
 *                 description: Địa chỉ
 *                 example: 123 Main St
 *               email:
 *                 type: string
 *                 description: Địa chỉ email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mật khẩu
 *                 example: strongpassword
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *       400:
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Địa chỉ email
 *                 example: pvl@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mật khẩu
 *                 example: pvl2610@
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
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
router.get('/profile', authenticateToken(1, 2, 3), userController.getProfile);

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
router.get('/review', authenticateToken(1, 2, 3), userController.getReview);
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
router.get('/booking', authenticateToken(1, 2, 3), userController.getBooking);

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
router.get('/room', authenticateToken(1, 2, 3), userController.getRoomBooked);
// router.patch('/editProfile', authenticateToken())

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: 'Bạn đã truy cập thành công vào route bảo vệ!' });
  },
);

module.exports = router;
