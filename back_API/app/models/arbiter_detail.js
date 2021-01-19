const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('arbiter_detail', {
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
    type: {
      type: "ENUM('PRINCIPAL','ASSISTANT')",
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'arbiter_detail',
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
        name: "IDX_B84BB4F7164D8144",
        using: "BTREE",
        fields: [
          { name: "person_id" },
        ]
      },
      {
        name: "IDX_B84BB4F75668DC33",
        using: "BTREE",
        fields: [
          { name: "match_sheet_id" },
        ]
      },
    ]
  });
};
