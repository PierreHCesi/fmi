const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('match_sheet', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    home_club_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'club',
        key: 'id'
      },
      unique: "FK_3956EE43D439C16A"
    },
    visitor_club_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'club',
        key: 'id'
      },
      unique: "FK_3956EE43EADE5854"
    },
    status: {
      type: "ENUM('BEFORE','CLOSE')",
      allowNull: false
    },
    candidate_home: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    candidate_visitor: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'match_sheet',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UNIQ_3956EE43D439C16A",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "home_club_id" },
        ]
      },
      {
        name: "UNIQ_3956EE43EADE5854",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "visitor_home_id" },
        ]
      },
    ]
  });
};
