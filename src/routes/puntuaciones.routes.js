const { Router } = require("express");
const route = Router();
const middleware = require("../middlewares/auth.middleware");
const puntuacionesController = require("../controllers/puntuaciones.controller");

route.get(
  "/all-puntuaciones",
  middleware,
  puntuacionesController.getPuntuaciones
);

route.get(
  "top-puntuaciones",
  middleware,
  puntuacionesController.getTopPuntuaciones
);

route.post(
  "/all-puntuaciones",
  middleware,
  puntuacionesController.createPuntuaciones
);

module.exports = route;
