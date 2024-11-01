const helloRoute = require('./hello');
const hotelRoute = require('./hotel');
const userRoute = require('./user');
const authRoute = require('./auth');

function route(app) {
    app.use('/api/hello', helloRoute);
    app.use('/api/hotels', hotelRoute);
    app.use('/api/user', userRoute);
    app.use('/auth', authRoute);
}
module.exports = route;