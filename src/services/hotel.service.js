const Hotel = require('../models/hotel.model');
const redisClient = require('../config/redisClient.config');

async function getHotels() {
  return await Hotel.findAndCountAll();
}

async function createHotel(hotel) {
  return await Hotel.create(hotel);
}
async function updateHotel(hotel) {
  const { hotel_id, ...updateData } = hotel;
  return await Hotel.update(updateData, {
    where: { hotel_id: hotel_id },
  });
}
async function approveHotel(hotelId) {
  const hotel = await Hotel.findByPk(hotelId);
  if (!hotel) {
    throw new Error('hotel_not_found');
  }

  hotel.isApproved = 1;
  await hotel.save();
}
async function getHotelbyId(hotel_id) {
  const hotel = await Hotel.findByPk(hotel_id);
  if (!hotel) {
    throw new Error('hotel_not_found');
  }
  await redisClient.setEx(`hotel:${hotel_id}`, 3600, JSON.stringify(hotel));
  return hotel;
}

async function deleteHotel(hotel_id) {
  const hotel = await Hotel.findByPk(hotel_id);
  if (!hotel) {
    throw new Error('hotel_not_found');
  }
  return await hotel.destroy();
}

module.exports = {
  getHotels,
  createHotel,
  updateHotel,
  approveHotel,
  getHotelbyId,
  deleteHotel,
};
