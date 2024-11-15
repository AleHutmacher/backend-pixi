const { Router } = require("express");
const route = Router();
const middleware = require("../middlewares/puntuaciones.middleware");
const puntuacionesController = require("../controllers/puntuaciones.controller");

route.get(
  "/all-puntuaciones",
  middleware.validatePuntuaciones,
  puntuacionesController.getPuntuaciones
);

route.get(
  "/top-puntuaciones",
  middleware.validatePuntuaciones,
  puntuacionesController.getTopPuntuaciones
);

route.post(
  "/all-puntuaciones",
  middleware.validatePuntuaciones,
  puntuacionesController.createPuntuaciones
);

module.exports = route;
