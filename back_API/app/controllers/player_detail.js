const { Op } = require("sequelize");
const db = require("../models");
const Player = db.player_detail;


exports.getAllPlayerOfMatchSheet = (req, res) => {
    db.sequelize.query(""
        + "select * from player_detail "
        + "left join match_sheet on match_sheet.id = player_detail.match_sheet_id "
        + "left join person on person.id = player_detail.person_id "
        + "where player_detail.match_sheet_id = :match_id"
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

exports.getAllPlayerVisitorOfMatchSheet = (req, res) => {
    db.sequelize.query(""
        + "select * from player_detail "
        + "left join match_sheet on match_sheet.id = player_detail.match_sheet_id "
        + "left join person on person.id = player_detail.person_id "
        + "where player_detail.match_sheet_id = :match_id and person.club_id = match_sheet.visitor_club_id"
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

exports.getAllPlayerHomeOfMatchSheet = (req, res) => {
    db.sequelize.query(""
        + "select * from player_detail "
        + "left join match_sheet on match_sheet.id = player_detail.match_sheet_id "
        + "left join person on person.id = player_detail.person_id "
        + "where player_detail.match_sheet_id = :match_id and person.club_id = match_sheet.home_club_id"
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
    Player.bulkCreate(req.body).then(function (response) {
        res.json(response)
    })
        .catch(function (error) {
            res.json(error);
        })
};

exports.edit = (req, res) => {
    Player.update({
        person_id: req.body.person_id,
        match_sheet_id: req.body.match_sheet_id,
        position: req.body.position,
        placement: req.body.placement,
        is_captain: req.body.is_captain,
        is_second_captain: req.body.is_second_captain,
        is_spare: req.body.is_spare,
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
    Player.destroy({
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