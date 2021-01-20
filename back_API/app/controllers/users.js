const { Op } = require("sequelize");
const db = require("../models");
const jwt = require('jsonwebtoken');
const accessTokenSecret = '|_1981_accesstokensecret_XX_|';

exports.login = (req, res) => {
    if (req.body.username != '' || req.body.password != '') {

        const crypto = require('crypto');

        const hash = crypto.createHmac('sha256', req.body.password)
            .update('fmiprojet')
            .digest('hex');

        db.sequelize.query(""
            + "select * "
            + "from users "
            + "where username = :username and password = :password"
            , { replacements: { username: req.body.username, password: hash }, type: db.sequelize.QueryTypes.SELECT })
            .then(data => {
                user = data[0]
                if (user) {
                    // Generate an access token
                    const token = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);
                    console.log(user, token)
                    res.send({
                        user: user,
                        accesstoken: token
                    });
                } else {
                    res.json(null);
                }
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving process."
                });
            });
    } else {
        res.json(null);
    }
};


