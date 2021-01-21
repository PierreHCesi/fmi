const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('metadata', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'id'
      }
    },
    match_sheet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'match_sheet',
        key: 'id'
      }
    },
    key_metadata_field: {
      type: "ENUM('BUT','RED_CARD','INPUT','OUTPUT','YELLOW_CARD', 'CSC')",
      allowNull: false
    },
    valueTime: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'metadata',
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
        name: "IDX_4F14341499E6F5DF",
        using: "BTREE",
        fields: [
          { name: "person_id" },
        ]
      },
      {
        name: "IDX_4F143414E48FD905",
        using: "BTREE",
        fields: [
          { name: "match_sheet_id" },
        ]
      },
    ]
  });
};
