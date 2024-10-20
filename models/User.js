const { connectDatabase } = require('../config/db');

const User = function(user) {
  this.user_id = user.user_id;
  this.name = user.name;
  this.phone = user.phone;
  this.address = user.address;
  this.email = user.email;
  this.password = user.password;
};
User.getUserById = async function(id) {
  try {
    const connection = await connectDatabase();
    const [rows] = await connection.query("SELECT * FROM Users WHERE user_id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

module.exports = User;
