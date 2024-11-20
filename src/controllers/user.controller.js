const User = require('../models/user.model');
const reviewService = require('../services/review.service');
const roomService = require('../services/room.service');
const bookingService = require('../services/booking.service');
const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { sendWelcomeEmail } = require('../services/mail.service');

class userController {
  async register(req, res) {
    const { name, phone, address, email, password } = req.body;
    try {
      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: req.t('email_already') });
      }

      const newUser = { name, phone, address, email, password };
      const userId = await userService.createUser(newUser);
      await sendWelcomeEmail(email, name);
      res
        .status(201)
        .json({ message: req.t('register_success'), new_user: userId });
    } catch (error) {
      res.status(500).json({ error: req.t('server_error') });
    }
  }

  async login(req, res) {
    // const { email, password } = req.body;
    // try {
    //     const user = await User.findByEmail(email);
    //     if (!user) {
    //         return res.status(401).json({ message: "Invalid email or password" });
    //     }

    //     const isPasswordValid = await bcrypt.compare(password, user.password);
    //     if (!isPasswordValid) {
    //         return res.status(401).json({ message: "Invalid email or password" });
    //     }

    //     const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3m' });
    //     res.status(200).json({ message: "Login successful", token });
    // } catch (error) {
    //     res.status(500).json({ error: "Internal Server Error" });
    // }

    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? req.t(info.message) : req.t('login_failed'),
          user,
        });
      }

      const token = jwt.sign(
        { user_id: user.user_id, email: user.email, role_id: user.role_id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
      );
      return res.json({ message: req.t('login_success'), token });
    })(req, res);
  }
  async getProfile(req, res) {
    try {
      const user = await userService.getUserById(req.user.user_id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: req.t('user_not_found') });
      }
    } catch (error) {
      res.status(500).json({ error: req.t('server_error') });
    }
  }

  async getReview(req, res, next) {
    try {
      const reviews = await reviewService.getUserReviews(req.user.user_id);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: req.t('server_error') });
    }
  }

  async getBooking(req, res, next) {
    const { page = 1, limit = 10, sort = 'desc' } = req.query;

    try {
      const result = await roomService.getBookedRooms(req.user.user_id, {
        page,
        limit,
        sort,
      });
      console.log(result);
      res.status(200).json({
        total: result.count,
        page: parseInt(page),
        limit: parseInt(limit),
        data: result.rows,
      });
    } catch (error) {
      res.status(500).json({ error: req.t('server_error') });
    }
  }

  async getRoomBooked(req, res, next) {
    try {
      const room = await bookingService.getBookingById(
        req.user.user_id,
        req.query.reservationId,
      );
      if (room) {
        res.status(200).json(room);
      } else {
        res.status(404).json({ message: req.t('room_not_found') });
      }
    } catch (error) {
      res.status(500).json({ error: req.t('server_error') });
    }
  }
}

module.exports = new userController();
