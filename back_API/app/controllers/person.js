const { Op } = require("sequelize");
const db = require("../models");
const Person = db.person;
const Club = db.club;


exports.getAllPersons = (req, res) => {
    Person.findAll()
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

exports.getAllArbiters = (req, res) => {
    Person.findAll({
        where: {
            role: 'arbiter'
        }
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

exports.getAllPlayersWithClubId = async (req, res) => {
    Person.findAll({
        where: {
            club_id: req.params.id,
            role: "player"
        },
        include: [
            {
                model: Club,
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
    Person.findAll({
        where: {
            club_id: req.params.id,
            [Op.or]: [
                { role: 'coach' },
                { role: 'second_coach' }
            ]
        },
        include: [
            {
                model: Club,
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