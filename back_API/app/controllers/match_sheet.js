const { Op } = require("sequelize");
const db = require("../models");
const Match = db.match_sheet;
const Club = db.club;
const Person = db.person;

exports.getAllMatchSheet = (req, res) => {
    Match.findAll()
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

exports.getAllMatchSheetWithClubs = (req, res) => {
    db.sequelize.query(""
        + "select match_sheet.id, home_club_id, visitor_club_id, status, date, home.name as homeName, "
        + "visitor.name as visitorName, home.logo_url as homeLogo, visitor.logo_url as visitorLogo, home.city as location "
        + "from match_sheet left join club as home on home.id = match_sheet.home_club_id left join club as visitor on visitor.id = match_sheet.visitor_club_id"
        , { type: db.sequelize.QueryTypes.SELECT })
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

exports.getMatchSheetInProgressWithClubId = (req, res) => {
    console.log(req.params)
    db.sequelize.query(""
        + "select "
        + "id, candidate_home, candidate_visitor, status, date, home_club_id, visitor_club_id, "
        + "CASE "
        + "    WHEN home_club_id= :id AND candidate_home=0 THEN 'HOME' "
        + "    WHEN home_club_id= :id AND candidate_home=1 THEN 'HOME_MODIF' "
        + "    WHEN visitor_club_id= :id AND candidate_visitor=0 THEN 'VISITOR' "
        + "    WHEN visitor_club_id= :id AND candidate_visitor=1 THEN 'VISITOR_MODIF' "
        + "    ELSE 'Erreur' "
        + "END as state_club_of_matchsheet "
        + "from match_sheet "
        + "where (home_club_id = :id OR visitor_club_id = :id) AND status = 'BEFORE'"
        , { replacements: { id: req.params.id }, type: db.sequelize.QueryTypes.SELECT })
        .then(data => {
            res.send(data);
            console.log(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving process."
            });
        });

};


exports.create = (req, res) => {
    Match.create({
        home_club_id: req.body.home_club_id,
        visitor_club_id: req.body.visitor_club_id,
        status: "BEFORE",
        candidate_home: 0,
        candidate_visitor: 0,
        date: req.body.date
    })
        .then((result) => {
            res.json(result)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving process."
            });
        });
};

exports.edit = (req, res) => {

    Match.update({
        home_club_id: req.body.home_club_id,
        visitor_club_id: req.body.visitor_club_id,
        status: req.body.status,
        date: req.body.date
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
exports.editCandidateHome = (req, res) => {
    console.log(req.body, req.params.id)
    Match.update({
        candidate_home: req.body.candidate_home,
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
}
exports.editCandidateVisitor = (req, res) => {
    console.log(req.body, req.params.id)
    Match.update({
        candidate_visitor: req.body.candidate_visitor,
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
}


exports.delete = (req, res) => {
    Match.destroy({
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