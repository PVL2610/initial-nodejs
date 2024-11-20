const roomService = require('../services/room.service');

class roomController {
  async createRoom(req, res, next) {
    const { hotel_id, name, area, floor, type, status, price } = req.body;
    try {
      const newRoom = { hotel_id, name, area, floor, type, status, price };
      const createdRoom = await roomService.createRoom(newRoom);
      res
        .status(200)
        .json({ message: req.t('create_room_success'), createdRoom });
    } catch (error) {
      res.status(500).json({ error: req.t('server_error') });
    }
  }
  async approveRoom(req, res, next) {
    try {
      await roomService.approveRoom(req.body.hotel_id);
      res.status(200).json({ message: req.t('approve_room_success') });
    } catch (error) {
      if (error.message === 'Room not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ error: req.t('server_error') });
    }
  }
}
module.exports = new roomController();
