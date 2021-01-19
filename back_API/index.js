const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const accessTokenSecret = '|_1981_accesstokensecret_XX_|';
const app = express();
const dotenv = require('dotenv');
dotenv.config();

var corsOptions = {
    origin: process.env.CORS
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//If database is not exists
//const db = require("./app/models");
//db.sequelize.sync();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

require("./app/routes/users")(app, authenticateJWT);
require("./app/routes/club")(app, authenticateJWT);
require("./app/routes/person")(app, authenticateJWT);
require("./app/routes/match_sheet")(app, authenticateJWT);
require("./app/routes/arbiter_detail")(app, authenticateJWT);
require("./app/routes/player_detail")(app, authenticateJWT);
require("./app/routes/metadata")(app, authenticateJWT);
require('./config/swaggerJsdoc')(app, authenticateJWT);

app.get("/", authenticateJWT, (req, res) => {
    res.json({ message: "Rest API" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

