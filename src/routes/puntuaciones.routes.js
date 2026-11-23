const { Router } = require("express");
const route = Router();
const middleware = require("../middlewares/puntuaciones.middleware");
const { verificarApiKey } = require("../middlewares/apikey.middleware");
const puntuacionesController = require("../controllers/puntuaciones.controller");

route.get(
  "/all-puntuaciones",
  verificarApiKey,
  puntuacionesController.getPuntuaciones
);

route.get(
  "/top-puntuaciones",
  verificarApiKey,
  puntuacionesController.getTopPuntuaciones
);

route.post(
  "/all-puntuaciones",
  verificarApiKey,
  middleware.validatePuntuaciones,
  puntuacionesController.createPuntuaciones
);

module.exports = route;
