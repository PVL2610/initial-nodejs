const Reservation = require('../models/reservation.model');
const Room = require('../models/room.model');

async function getBookingById(userId, reservationId) {
  return await Reservation.findOne({
    where: {
      reservation_id: reservationId,
      user_id: userId,
    },
    include: [{ model: Room }],
  });
}

module.exports = {
  getBookingById,
};
