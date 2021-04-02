const { db, models } = require("../models");
const moment = require('moment');
const Op = db.Sequelize.Op;
const Employee = models.Employee;
const Team = models.Team;

const { baseResource } = require('../resources/base.resource');

// Relationships
Team.hasMany(Employee, {foreignKey: 'teamId'})
Employee.belongsTo(Team, {foreignKey: 'teamId'})

// Create and Save
exports.create = (req, res) => {

    // Validate request
    if (!req.body.firstName) {
        res.status(400).send({
            message: "firstName can not be empty!"
        });
        return;
    }

    // Create
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        registered: moment(req.body.registered).format('YYYY-MM-DD hh:mm:ss'),
        isActive: Boolean(req.body.isActive),
        teamId: parseInt(req.body.teamId)
    };

    // Save in the database
    Employee.create(employee)
        .then(data => {
            res.send(baseResource(data));
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Employee."
            });
        });
};

// Retrieve all from the database
exports.findAll = (req, res) => {

    // filters
    const firstName = req.query.firstName;
    let condition = firstName ? { firstName: { [Op.like]: `%${firstName}%` } } : null;

    Employee.findAll({
        where: condition,
        include: [{
            model: Team,
        }]
    })
        .then(data => {
            res.send(baseResource(data));
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employees."
            });
        });
};

// Find a single with an id
exports.find = (req, res) => {
    const id = req.params.id;

    let condition = { id: id };

    Employee.findOne({
        where: condition,
        include: [{
            model: Team,
        }]
    })
        .then(data => {
            res.send(baseResource(data));
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Employee with id=${id}`
            });
        });
};

// exports.find = (req, res) => {
//     const id = req.params.id;
//
//     Employee.findByPk(id)
//         .then(data => {
//             res.send(baseResource(data));
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: `Error retrieving Employee with id=${id}`
//             });
//         });
// };

// Update by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Employee.update(req.body, {
        where: { id: id }
    })
        .then(async(num) => {
            if (parseInt(num) === 1) {
                const data = await Employee.findOne({ where: { id: id } });
                res.send(baseResource(data, `Employee #${id} was updated successfully.`));
            } else {
                res.send({
                    message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Employee with id=" + id
            });
        });
};

// Delete with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Employee.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Employee #${id} was deleted successfully !`
                });
            } else {
                res.send({
                    message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Employee with id=" + id
            });
        });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {
    Employee.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Employees were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all employees."
            });
        });
};

// Find all published
exports.findAllPublished = (req, res) => {
    Employee.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employees."
            });
        });
};