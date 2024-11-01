const { connectDatabase } = require('../config/db');
const bcrypt = require('bcrypt');

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

User.createUser = async function(newUser) {
  try {
    if (!newUser.password) {
      throw new Error("Password is required for hashing.");
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const connection = await connectDatabase();
    const [result] = await connection.query(
      "INSERT INTO hotelbooking.Users (name, phone, address, email, password) VALUES (?, ?, ?, ?, ?)", 
      [newUser.name, newUser.phone, newUser.address, newUser.email, hashedPassword]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

User.createFacebookUser = async function(facebookUser) {
  try {
    const connection = await connectDatabase();
    const [result] = await connection.query(
      "INSERT INTO hotelbooking.Users (name, email, password) VALUES (?, ?, ?)", 
      [facebookUser.name, facebookUser.email, null] 
    );
    return result.insertId;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};


User.findByEmail = async function(email) {
  try {
    const connection = await connectDatabase();
    const [rows] = await connection.query("SELECT * FROM hotelbooking.Users WHERE email = ?", [email]);
    return rows[0];
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

module.exports = User;
