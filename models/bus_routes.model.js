const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BusRoutes = sequelize.define(
  "Bus_routes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    from_district_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to_district_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    distance_km: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estimated_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = BusRoutes;
