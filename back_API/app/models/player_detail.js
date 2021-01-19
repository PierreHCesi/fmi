const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('player_detail', {
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
    position: {
      type: "ENUM('AVANT','AILIER','MILIEU_OFF','MILIEU','MILIEU_DEF','ARRIERE','GARDIEN')",
      allowNull: false
    },
    placement: {
      type: "ENUM('GAUCHE','CENTRE','DROIT')",
      allowNull: false
    },
    is_captain: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    is_second_captain: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    is_spare: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'player_detail',
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
        name: "IDX_B106E94D99E6F5DF",
        using: "BTREE",
        fields: [
          { name: "person_id" },
        ]
      },
      {
        name: "IDX_B106E94DE48FD905",
        using: "BTREE",
        fields: [
          { name: "match_sheet_id" },
        ]
      },
    ]
  });
};
