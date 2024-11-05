const helloRoute = require('./hello');
const hotelRoute = require('./hotel');
const userRoute = require('./user');
const roomRoute = require('./room');
const authRoute = require('./auth');
const adminRoute = require('./admin');

function route(app) {
    app.use('/api/hello', helloRoute);
    app.use('/api/hotel', hotelRoute);
    app.use('/api/user', userRoute);
    app.use('/api/room', roomRoute);
    app.use('/api/admin', adminRoute);
    app.use('/auth', authRoute);
}
module.exports = route;