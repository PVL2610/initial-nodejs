const express = require('express');
const app = express();
require('dotenv').config({ path: './src/.env' });
const logMiddleware = require('./middleware/logMiddleware');
const route = require('./routes');
const sequelize = require('./config/db');
const Hotel = require('./models/hotel.model');
const Room = require('./models/room.model');
const Role = require('./models/role.model');
const User = require('./models/user.model');
const Reservation = require('./models/reservation.model');
const HotelReview = require('./models/hotelReview.model');


const { swaggerUi, swaggerDocs, swaggerAuth } = require('./config/swagger');
const passport = require('passport'); 
require('./config/passport');

const helmet = require('helmet');
const cors = require('cors');
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "allowedHeaders": 'Content-Type,Authorization',
    "optionsSuccessStatus": 204
};
app.use(cors(corsOptions));
app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", 'example.com'],
          styleSrc: ["'self'", 'example.com'],
          imgSrc: ["'self'", 'img.example.com'],
        },
      },
      frameguard: {
        action: 'deny',
      },
      hsts: {
        maxAge: 60 * 60 * 24 * 365, 
        includeSubDomains: true,
        preload: true, 
      },
      xssFilter: true, 
      noSniff: true,
    })
  );

// db.connectDatabase();
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => console.log('Error creating database:', error));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logMiddleware);
app.use(passport.initialize());
route(app);
app.use('/docs', swaggerAuth, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})