const { connectDatabase } = require('../config/db');


const HotelReview = function(hotelReview) {
  this.review_id = hotelReview.review_id;
  this.hotel_id = hotelReview.hotel_id;
  this.user_id = hotelReview.user_id;
  this.rating = hotelReview.rating;
  this.comment = hotelReview.comment;
};
HotelReview.getReview = async function(userId) {
  try {
    const connection = await connectDatabase();
    const [rows] = await connection.query(`SELECT hr.review_id, hr.hotel_id, hr.rating, hr.comment, hr.created_at
                                            FROM HotelReviews hr
                                            WHERE hr.user_id = ?
                                            ORDER BY hr.created_at DESC`, [userId]);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

module.exports = HotelReview;
