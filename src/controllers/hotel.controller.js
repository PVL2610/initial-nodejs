const Hotel = require('../models/hotel.model');
const hotelService = require('../services/hotelService');

class hotelController {
  async getHotels(req, res, next) {
    try {
      const hotels = await hotelService.getHotels();
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async createHotel(req, res, next) {
    const { name, address, description, rating} = req.body;
    try {
      const newHotel = { name, address, description, rating};
      await Hotel.create(newHotel);
      res.status(200).json({ message: "Hotel has been created successfully"});

    } catch(error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async updateHotel(req, res, next) {
    const { hotel_id, name, address, description, rating} = req.body;
    try {
      const newHotel = { hotel_id, name, address, description, rating};
      await hotelService.updateHotel(newHotel);
      res.status(200).json({ message: "Hotel has been updated successfully"});

    } catch(error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async deleteHotel(req, res, next) {
    try {
      const hotel = await Hotel.findByPk(req.body.hotel_id);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found"});
      }
      await hotel.destroy();
      res.status(200).json({ message: "Hotel has been deleteed successfully"});

    } catch(error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async approveHotel(req, res, next) {
    try {
      await hotelService.approveHotel(req.body.hotel_id);
      res.status(200).json({ message: "Hotel has been successfully approved" });
    } catch(error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
module.exports = new hotelController;