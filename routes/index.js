const helloRoute = require('./hello');
const hotelRoute = require('./hotel');
const userRoute = require('./user');

function route(app) {
    app.use('/api/hello', helloRoute);
    app.use('/api/hotels', hotelRoute);
    app.use('/api/user', userRoute);
}
module.exports = route;