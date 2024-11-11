const HotelReview = require('../models/hotelReview.model');
const Hotel = require('../models/hotel.model');

async function getUserReviews(userId) {
    return await HotelReview.findAll({
        where: { user_id: userId },
        include: [{ model: Hotel }],
    });
}

module.exports = {
    getUserReviews,
};