const hotelService = require('../../services/hotel.service');

const handleHotelCreate = async (data) => {
  try {
    console.log('Processing hotel create:', data);
    await hotelService.createHotel(data);
    console.log('Hotel created successfully:', data.name);
  } catch (error) {
    console.error('Error processing hotel creation:', error);
  }
};

module.exports = handleHotelCreate;
