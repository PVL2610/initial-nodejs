const User = require('../models/User');
const HotelReview = require('../models/HotelReview');
const Room = require('../models/Room')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class userController {
    async register(req, res) {
        const { name, phone, address, email, password } = req.body;
        try {
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "Email is already registered" });
            }
            
            const newUser = { name, phone, address, email, password };
            const userId = await User.createUser(newUser);
            
            res.status(201).json({ message: "User registered successfully", user_id: userId });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    getProfile(req, res, next) {
        User.getUserById(req.query.user_id)
            .then(user => res.json(user))
            .catch(next);
    }
    
    getReview(req, res, next) {
        HotelReview.getReview(req.query.user_id)
            .then(reviews => res.json(reviews))
            .catch(next);
    }
    getBooking(req, res, next) {
        Room.getBooking(req.query.user_id,  req.query.page, req.query.limit, req.query.sort )
            .then(rooms => res.json(rooms))
            .catch(next);
    }
    getRoomBooked(req, res, next) {
        Room.getBookingDetails(req.query.reservationId)
            .then(room => res.json(room))
            .catch(next);
    }
}

module.exports = new userController;