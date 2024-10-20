const User = require('../models/User');
const HotelReview = require('../models/HotelReview');
const Room = require('../models/Room')

class userController {
    getProfile(req, res, next) {
        User.getUserById(req.body.user_id)
            .then(user => res.json(user))
            .catch(next);
    }
    
    getReview(req, res, next) {
        HotelReview.getReview(req.body.user_id)
            .then(reviews => res.json(reviews))
            .catch(next);
    }
    getBooking(req, res, next) {
        Room.getBooking(req.body.user_id,  req.body.page, req.body.limit, req.body.sort )
            .then(rooms => res.json(rooms))
            .catch(next);
    }
    getRoomBooked(req, res, next) {
        Room.getBookingDetails(req.body.reservationId)
            .then(room => res.json(room))
            .catch(next);
    }
}

module.exports = new userController;