const { connectDatabase } = require('../config/db');

const getHotels = async (req, res) => {
  try {
    const connection = await connectDatabase();
    const [results] = await connection.execute('SELECT * FROM hotels');
    res.json(results);

    await connection.end();
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch hotels' });
    console.error(err);
  }
};

module.exports = { getHotels };

