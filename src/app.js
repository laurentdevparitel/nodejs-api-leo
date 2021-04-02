// -- Config
const config = require('./config');
// console.log('config', config);

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require('helmet');
const morgan = require('morgan');

const { baseResource } = require('./resources/base.resource');

const app = express();

// -- Middleware(s)

// API's security
app.use(helmet());

// Log HTTP requests
app.use(morgan('combined'));    // 'tiny|combined'

// Cors
app.use(cors(config.cors));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Models (?)
const { db, models } = require("./models");

(async () => {
    await db.sequelize.sync();  // creates the tables if it doesn't exist (and does nothing if it already exists)
    console.log("--> All models were synchronized successfully.");
})();

// -- Routes
app.get(`/${global.gConfig.base_api_url}`, (req, res) => {
    res.json(baseResource(`Welcome to ${global.gConfig.app_name} !`)).status(200);
});

require("./routes/team.routes")(app);
require("./routes/employee.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});