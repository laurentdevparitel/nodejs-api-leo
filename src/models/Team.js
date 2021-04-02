module.exports = (sequelize, Sequelize, DataTypes) => {

    const Team = sequelize.define("Team", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'teams',  // optional
        //timestamps: false,
        //freezeTableName: true,
    });

    return Team;
};