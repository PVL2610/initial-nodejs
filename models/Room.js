const { connectDatabase } = require('../config/db');



const Room = function(room) {
  this.room_id = room.room_id;
  this.hotel_id = room.hotel_id;
  this.name = room.name;
  this.area = room.area;
  this.floor = room.floor;
  this.type = room.type;
  this.status = room.status;
  this.price = room.price;
};
Room.getBooking = async function(userId,  page = 0, limit = 10, sort = 'desc' ) {
  try {
    const connection = await connectDatabase();
    const offset = page * limit;
    const [rows] = await connection.query(`SELECT Reservations.reservation_id, Rooms.name AS room_name, Hotels.name AS hotel_name, Reservations.checkin_date, 
                                            Reservations.checkout_date, Reservations.status, Rooms.price
                                            FROM Reservations
                                            JOIN Rooms ON Reservations.room_id = Rooms.room_id
                                            JOIN Hotels ON Rooms.hotel_id = Hotels.hotel_id
                                            WHERE Reservations.user_id = ?                                
                                            ORDER BY Reservations.checkin_date ${sort === 'asc' ? 'ASC' : 'DESC'}
                                            LIMIT ? OFFSET ?;`, [userId, Number(limit), Number(offset)]);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};
Room.getBookingDetails = async function(userId, reservationId) {
  try {
    const connection = await connectDatabase();
    const [rows] = await connection.query(`SELECT r.room_id, r.name, r.area, r.floor, r.type, r.status, r.price, res.checkin_date, res.checkout_date, res.status
                                            FROM Rooms r
                                            JOIN Reservations res ON r.room_id = res.room_id AND res.user_id = ?                                
                                            WHERE res.reservation_id = ?`, [userId, reservationId]);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

module.exports = Room;
