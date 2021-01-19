const { Op } = require("sequelize");
const db = require("../models");
const Metadata = db.metadata;


exports.getAllMetadataOfMatchSheet = (req, res) => {
    db.sequelize.query(""
        + "SELECT metadata.id, metadata.key_metadata_field, metadata.valueTime, person.name, person.club_id, match_sheet.home_club_id, match_sheet.visitor_club_id from metadata "
        + "left join match_sheet on match_sheet.id = metadata.match_sheet_id "
        + "left join person on person.id = metadata.person_id "
        + "where metadata.match_sheet_id = :match_id"
        , { replacements: { match_id: req.params.id }, type: db.sequelize.QueryTypes.SELECT })
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
    Metadata.create({
        person_id: req.body.person_id,
        match_sheet_id: req.body.match_sheet_id,
        key_metadata_field: req.body.key_metadata_field,
        valueTime: req.body.valueTime,
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
    Metadata.update({
        person_id: req.body.person_id,
        match_sheet_id: req.body.match_sheet_id,
        key_metadata_field: req.body.key_metadata_field,
        valueTime: req.body.valueTime,
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
    Metadata.destroy({
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