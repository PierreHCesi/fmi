const { Op } = require("sequelize");
const db = require("../models");
const Arbiter = db.arbiter_detail;
const Person = db.person;
const Country = db.country;

exports.getAllArbiterOfMatchSheet = (req, res) => {
    Arbiter.findAll({
        where: {
            match_sheet_id: req.params.id
        },
        include: [
            {
                model: Person,
                include: [
                    {
                        model: Country,
                    }
                ]
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


exports.create = (req, res) => {
    Arbiter.create({
        person_id: req.body.person_id,
        match_sheet_id: req.body.match_sheet_id,
        type: req.body.type
    })
        .then((result) => res.json(result))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving process."
            });
        });
};

exports.edit = (req, res) => {
    Arbiter.update({
        person_id: req.body.person_id,
        match_sheet_id: req.body.match_sheet_id,
        type: req.body.type
    }, {
        where: {
            id: req.params.id
        }
    })
        .then((result) => res.json(result))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving process."
            });
        });
};

exports.delete = (req, res) => {
    Arbiter.destroy({
        where: { id: req.params.id }
    })
        .then((result) => res.json(result))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving process."
            });
        });
};