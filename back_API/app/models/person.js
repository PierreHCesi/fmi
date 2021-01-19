const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('person', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: "ENUM('player','coach','second_coach','arbiter')",
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    poste: {
      type: "ENUM('GARDIEN','DEFENSEUR','MILIEU','ATTAQUANT')",
      allowNull: true
    },
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'club',
        key: 'id'
      }
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'person',
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
        name: "IDX_34DCD176F92F3E70",
        using: "BTREE",
        fields: [
          { name: "country_id" },
        ]
      },
      {
        name: "fk_constraint_club",
        using: "BTREE",
        fields: [
          { name: "club_id" },
        ]
      },
    ]
  });
};
