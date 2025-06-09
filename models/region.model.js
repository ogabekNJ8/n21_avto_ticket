const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Region = sequelize.define(
  "Region",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Region;
