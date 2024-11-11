const client = require('../config/redisClient.config')

async function cacheHotel(req, res, next) {
    const hotelId = req.params.hotel_id;
    
    try {
        const cacheData = await client.get(`hotel:${hotelId}`);

        const keys = await client.keys('*');

        for (const key of keys) {
            const data = await client.get(key);
            console.log(data); 
        }
        if (cacheData) {  
            return res.status(200).json(JSON.parse(cacheData));
        }
        
        next(); 
    } catch (error) {
        console.error(error);
        next();
    }
}

module.exports = { cacheHotel };
