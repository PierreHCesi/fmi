const { Op } = require("sequelize");
const db = require("../models");
const Club = db.club;
const Person = db.person;

// Create and Save a new Tutorial
exports.create = (req, res) => {

};

exports.getAllClubs = (req, res) => {
    Club.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving process."
            });
        });
};

exports.getAllPlayersWithClubId = (req, res) => {
    Club.findAll({
        include: [
            {
                model: Person,
                where: {
                    club_id: req.params.id,
                    role: "player"
                },
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving process."
            });
        });
};

exports.getAllStaffsWithClubId = (req, res) => {
    Club.findAll({
        include: [
            {
                model: Person,
                where: {
                    club_id: req.params.id,
                    [Op.or]: [
                        { role: 'coach' },
                        { role: 'second_coach' }
                    ]
                },
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving process."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};