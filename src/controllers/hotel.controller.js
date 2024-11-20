const hotelService = require('../services/hotel.service');
const { sendMessage } = require('../kafka/producer');

class hotelController {
  async getHotels(req, res, next) {
    try {
      const hotels = await hotelService.getHotels();
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ error: req.t('server_error') });
    }
  }
  async getHotelbyId(req, res, next) {
    const hotelId = req.params.hotel_id;

    try {
      const hotel = await hotelService.getHotelbyId(hotelId);

      if (!hotel) {
        return res.status(404).json({ error: req.t('hotel_not_found') });
      }
      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json({ error: req.t('server_error') });
    }
  }
  async createHotel(req, res, next) {
    const { name, address, description, rating } = req.body;
    try {
      const newHotel = { name, address, description, rating };
      // await hotelService.createHotel(newHotel);
      await sendMessage('hotel-create', newHotel);
      res.status(200).json({ message: req.t('create_hotel_success') });
    } catch (error) {
      res.status(500).json({ error: req.t('server_error') });
    }
  }
  async updateHotel(req, res, next) {
    const { hotel_id, name, address, description, rating } = req.body;
    try {
      const newHotel = { hotel_id, name, address, description, rating };
      await hotelService.updateHotel(newHotel);
      res.status(200).json({ message: req.t('update_hotel_success') });
    } catch (error) {
      res.status(500).json({ error: req.t('server_error') });
    }
  }
  async deleteHotel(req, res, next) {
    try {
      await hotelService.deleteHotel(req.body.hotel_id);
      res.status(200).json({ message: req.t('delete_hotel_success') });
    } catch (error) {
      if (error.message === 'hotel_not_found') {
        return res.status(404).json({ message: req.t(error.message) });
      }
      res.status(500).json({ error: req.t('server_error') });
    }
  }
  async approveHotel(req, res, next) {
    try {
      await hotelService.approveHotel(req.body.hotel_id);
      res.status(200).json({ message: req.t('approve_hotel_success') });
    } catch (error) {
      if (error.message === 'hotel_not_found') {
        return res.status(404).json({ message: req.t(error.message) });
      }
      res.status(500).json({ error: req.t('server_error') });
    }
  }
}
module.exports = new hotelController();
