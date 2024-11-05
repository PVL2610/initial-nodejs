const roomService = require('../services/roomService');

class roomController {
    async createRoom(req, res, next) {
        const { hotel_id, name, area, floor, type, status, price } = req.body;
        try {
            const newRoom = { hotel_id, name, area, floor, type, status, price }
            const createdRoom = await roomService.createRoom(newRoom);  
            res.status(200).json({message: "Room created successfully", createdRoom});
        } catch(error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async approveRoom(req, res, next) {
        try {
          await roomService.approveRoom(req.body.hotel_id);
          res.status(200).json({ message: "Room has been successfully approved" });
        } catch(error) {
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
}
module.exports = new roomController;