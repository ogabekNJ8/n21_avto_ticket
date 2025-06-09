const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Buses = sequelize.define(
  "Buses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number_plate: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    seat_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Buses;
