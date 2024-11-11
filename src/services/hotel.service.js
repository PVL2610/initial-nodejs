const Hotel = require('../models/hotel.model');
const redisClient = require('../config/redisClient.config');

async function getHotels() {
    
    return await Hotel.findAndCountAll();
}
async function updateHotel(hotel) {
    const { hotel_id, ...updateData } = hotel;
    return await Hotel.update(updateData, {
        where: { hotel_id: hotel_id }
    });
}
async function approveHotel(hotelId) {
    const hotel = await Hotel.findByPk(hotelId);
    if(!hotel) throw new Error('Hotel not found');

    hotel.isApproved = 1;
    await hotel.save();
}
async function getHotelbyId(hotel_id) {
    const hotel = await Hotel.findByPk(hotel_id);   
    await redisClient.setEx(`hotel:${hotel_id}`, 3600, JSON.stringify(hotel));
    return hotel;
}


module.exports = {
    getHotels,
    updateHotel,
    approveHotel,
    getHotelbyId,
}