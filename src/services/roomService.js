const Reservation = require('../models/reservation.model');
const Room= require('../models/room.model');
const Hotel = require('../models/hotel.model');
const { Op } = require('sequelize');

async function getBookedRooms(userId, { page = 1, limit = 10, sort = 'desc' }) {
    const offset = (page - 1) * limit;
    
    return await Reservation.findAndCountAll({
        attributes: [
            'reservation_id',
            [Room.sequelize.col('Room.name'), 'room_name'],
            [Hotel.sequelize.col('Room->Hotel.name'), 'hotel_name'],
            'checkin_date',
            'checkout_date',
            'status',
            [Room.sequelize.col('Room.price'), 'price']
        ],
        include: [
            {
                model: Room,
                attributes: [],
                include: [
                    {
                        model: Hotel,
                        attributes: []
                    }
                ]
            }
        ],
        where: { user_id: userId },
        order: [['checkin_date', sort.toLowerCase() === 'asc' ? 'ASC' : 'DESC']],
        limit: Number(limit),
        offset: Number(offset)
    });
}

async function createRoom(room) {
    console.log(room);
    return await Room.create(room);
}
async function approveRoom(room_id) {
    const room = await Room.findByPk(room_id);
    if(!room) throw new Error('Room not found');

    room.isApproved = 1;
    await room.save();
}

module.exports = {
    getBookedRooms,
    createRoom,
    approveRoom,
};
