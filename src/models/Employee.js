module.exports = (sequelize, Sequelize, DataTypes) => {

    const Employee = sequelize.define("Employee", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING
        },
        registered: {
            type: DataTypes.DATE
        },
        isActive: {
            type: DataTypes.BOOLEAN
        },

        teamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {         // User belongsTo Team 1:n
                model: 'Teams',
                key: 'id'
            }
        },
    },
    {
        tableName: 'employees',  // optional - default: 'Employees'
        //timestamps: false,
        //freezeTableName: true,
    });

    return Employee;
};