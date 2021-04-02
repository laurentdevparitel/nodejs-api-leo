// .env config
require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_DATABASE,
    dialect: "mariadb",   /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    pool: {
        max: 5, // maximum number of connection in pool
        min: 0, // minimum number of connection in pool
        acquire: 30000, //  maximum time, in milliseconds, that a connection can be idle before being released
        idle: 10000 //  maximum time, in milliseconds, that pool will try to get connection before throwing error
    },
    logging: process.env.DEBUG,
};