const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({ path: './src/.env' });
const logMiddleware = require('./middleware/log.middleware');
const route = require('./routes');
const sequelize = require('./config/db');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');

const { swaggerUi, swaggerDocs, swaggerAuth } = require('./config/swagger.config');
const passport = require('passport'); 
require('./config/passport.config');

const helmet = require('helmet');
const cors = require('cors');



// Use static folder
// app.use(express.static(path.join(__dirname, 'public')));
//Multiple language
i18next
  .use(Backend)                    
  .use(i18nextMiddleware.LanguageDetector) 
  .init({
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/translation.json',
    },
    fallbackLng: 'en',                  // Ngôn ngữ mặc định
    preload: ['en', 'vi'],              // Các ngôn ngữ được load sẵn
    detection: {
      order: ['header', 'querystring', 'cookie'],  // Thứ tự phát hiện ngôn ngữ
      caches: ['cookie'],                          // Lưu ngôn ngữ vào cookie
    },
  });

app.use(i18nextMiddleware.handle(i18next));

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
//log api url
app.use(logMiddleware);
//passport
app.use(passport.initialize());
//route
route(app);
// swagger docs
app.use('/docs', swaggerAuth, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})