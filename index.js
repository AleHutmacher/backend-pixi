require("dotenv").config();

const express = require("express");
const app = express();

const routes = require("./src/routes/index.routes");

const db = require("./src/models");

app.use(express.json());
app.use(routes);

async function startDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log("Conexión establecida con PostgreSQL");
  } catch {
    console.log("No se pudo conectar con PostgreSQL");
  }
}

startDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en puerto ${process.env.PORT}`);
});
