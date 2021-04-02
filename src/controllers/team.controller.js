const { db, models } = require("../models");
const moment = require('moment');
const Op = db.Sequelize.Op;
const Team = models.Team;

const { baseResource } = require('../resources/base.resource');

// Create and Save
exports.create = (req, res) => {

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "name can not be empty!"
        });
        return;
    }

    // Create
    const team = {
        name: req.body.name,
        description: req.body.description
    };

    // Save in the database
    Team.create(team)
        .then(data => {
            res.send(baseResource(data));
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Team."
            });
        });
};

// Retrieve all from the database
exports.findAll = (req, res) => {

    // filters
    const name = req.query.name;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Team.findAll({ where: condition })
        .then(data => {
            res.send(baseResource(data));
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving teams."
            });
        });
};

// Find a single with an id
exports.find = (req, res) => {
    const id = req.params.id;

    Team.findByPk(id)
        .then(data => {
            res.send(baseResource(data));
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Team with id=${id}`
            });
        });
};

// Update by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Team.update(req.body, {
        where: { id: id },
        //returning: true,    // Postgree SQL only
        plain: true
    })
        .then(async(num) => {
            if (parseInt(num) === 1) {
                const data = await Team.findOne({ where: { id: id } });
                res.send(baseResource(data, `Team #${id} was updated successfully.`));
            } else {
                res.send({
                    message: `Cannot update Team with id=${id}. Maybe Team was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Team with id=" + id
            });
        });
};

// Delete with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Team.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Team #${id} was deleted successfully!`
                });
            } else {
                res.send({
                    message: `Cannot delete Team with id=${id}. Maybe Team was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Team with id=" + id
            });
        });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {
    Team.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Teams were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all teams."
            });
        });
};

// Find all published
exports.findAllPublished = (req, res) => {
    Team.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving teams."
            });
        });
};