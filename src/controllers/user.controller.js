const User = require('../models/user.model');
const reviewService = require('../services/reviewService');
const roomService = require('../services/roomService');
const bookingService = require('../services/bookingService');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const passport = require('passport');

class userController {
    async register(req, res) {
        const { name, phone, address, email, password } = req.body;
        try {
            const existingUser = await userService.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "Email is already registered" });
            }
            
            const newUser = { name, phone, address, email, password };
            const userId = await User.create(newUser);
            
            res.status(201).json({ message: "User registered successfully", new_user: userId });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
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
              return res.status(400).json({ message: info ? info.message : 'Đăng nhập thất bại', user });
            }
        
            const token = jwt.sign({ user_id: user.user_id, email: user.email, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: 3600 });
            return res.json({ message: 'Đăng nhập thành công!', token });
          })(req, res);
    }
    async getProfile(req, res) {
        try {
            const user = await userService.getUserById(req.user.user_id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
    async getReview(req, res, next) {
        try {
            const reviews = await reviewService.getUserReviews(req.user.user_id);
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getBooking(req, res, next) {
        const { page = 1, limit = 10, sort = 'desc' } = req.query;
        
        try {
            const result = await roomService.getBookedRooms(req.user.user_id, { page, limit, sort });
            console.log(result);
            res.status(200).json({
                total: result.count,
                page: parseInt(page),
                limit: parseInt(limit),
                data: result.rows,
            });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" }); 
        }
    }

    async getRoomBooked(req, res, next) {
        try {
            const room = await bookingService.getBookingById(req.user.user_id, req.query.reservationId);
            if (room) {
                res.status(200).json(room); 
            } else {
                res.status(404).json({ message: "Room not found" }); 
            }
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" }); 
        }
    }

}

module.exports = new userController;