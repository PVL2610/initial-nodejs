const Hotel = require('../models/hotel.model');

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


module.exports = {
    getHotels,
    updateHotel,
    approveHotel,
}