
const db = require("./db.config.js");
const app = require("./app.config.js");
const cors = require("./cors.config.js");

module.exports = {
    config: {
        db,
        app,
        cors,
    }
}