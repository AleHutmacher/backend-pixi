const { Datatypes } = require("sequelize");
const sequelize = require("../config/database");
const { allow } = require("joi");

const Puntuaciones = sequelize.define(
  "puntuaciones",
  {
    nombre: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    puntuacion: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Puntuaciones;
