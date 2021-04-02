const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Employee = require("./Employee.js")(sequelize, Sequelize, DataTypes);
const Team = require("./Team.js")(sequelize, Sequelize, DataTypes);

const models = {
    Employee,
    Team
};

// (Re) Create tables > migrations ?
const RECREATE_ALTER_TABLE_NAMES = [];  // 'Employee', 'Team'
const FORCE_TABLE_RECREATE = true;  // This creates the table, dropping it first if it already existed
const FORCE_TABLE_ALTER = false; // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

for (let modelName in models){
    if (!RECREATE_ALTER_TABLE_NAMES.includes(modelName)){
        continue;
    }
    (async () => {
        await models[modelName].sync({ force: FORCE_TABLE_RECREATE, alter:  FORCE_TABLE_ALTER})
        console.log(`--> The table for the ${modelName} model was just (re)created!`);
    })();
}

module.exports = {
    db,
    models
};