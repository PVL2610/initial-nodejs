const express = require('express');
const app = express();
const port = 3000;
const logMiddleware = require('./middleware/logMiddleware');
const route = require('./routes');
const db = require('./config/db');
db.connectDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logMiddleware);
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})