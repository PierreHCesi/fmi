const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users.js")(sequelize, Sequelize);
db.club = require("./club.js")(sequelize, Sequelize);
db.person = require("./person.js")(sequelize, Sequelize);
db.arbiter_detail = require("./arbiter_detail.js")(sequelize, Sequelize);
db.match_sheet = require("./match_sheet.js")(sequelize, Sequelize);
db.metadata = require("./metadata.js")(sequelize, Sequelize);
db.country = require("./country.js")(sequelize, Sequelize);
db.player_detail = require("./player_detail.js")(sequelize, Sequelize);

// Relation 
db.arbiter_detail.belongsTo(db.person, { foreignKey: "person_id" });
db.person.hasMany(db.arbiter_detail, { foreignKey: "person_id" });

db.arbiter_detail.belongsTo(db.match_sheet, { foreignKey: "match_sheet_id" });
db.match_sheet.hasMany(db.arbiter_detail, { foreignKey: "match_sheet_id" });

db.match_sheet.belongsTo(db.club, { foreignKey: "home_club_id" });
db.club.hasMany(db.match_sheet, { foreignKey: "home_club_id" });

db.match_sheet.belongsTo(db.club, { foreignKey: "visitor_club_id" });
db.club.hasMany(db.match_sheet, { foreignKey: "visitor_club_id" });

db.metadata.belongsTo(db.person, { foreignKey: "person_id" });
db.person.hasMany(db.metadata, { foreignKey: "person_id" });
db.metadata.belongsTo(db.match_sheet, { foreignKey: "match_sheet_id" });
db.match_sheet.hasMany(db.metadata, { foreignKey: "match_sheet_id" });
db.person.belongsTo(db.club, { foreignKey: "club_id" });
db.club.hasMany(db.person, { foreignKey: "club_id" });
db.person.belongsTo(db.country, { foreignKey: "country_id" });
db.country.hasMany(db.person, { foreignKey: "country_id" });
db.player_detail.belongsTo(db.person, { foreignKey: "person_id" });
db.person.hasMany(db.player_detail, { foreignKey: "person_id" });
db.player_detail.belongsTo(db.match_sheet, { foreignKey: "match_sheet_id" });
db.match_sheet.hasMany(db.player_detail, { foreignKey: "match_sheet_id" });

module.exports = db;