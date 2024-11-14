const { Puntuaciones } = require("../models/puntuaciones.model");
const { get } = require("../routes/puntuaciones.routes");

const controller = {};

controller.getPuntuaciones = async (req, res) => {
  const puntuaciones = await Puntuaciones.findAll();
  res.json(puntuaciones);
};
controller.getPuntuaciones = getPuntuaciones;

controller.getTopPuntuaciones = async (req, res) => {
  const puntuaciones = await Puntuaciones.findAll({
    order: [["puntuacion", "DESC"]],
    limit: 5,
  });
  res.json(puntuaciones);
};
controller.getTopPuntuaciones = getTopPuntuaciones;

controller.createPuntuaciones = async (req, res) => {
  const puntuaciones = await Puntuaciones.create(req.body);
  res.json(puntuaciones);
};
controller.createPuntuaciones = createPuntuaciones;

module.exports = controller;
