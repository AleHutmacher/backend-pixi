require("dotenv").config();

const express = require("express");
const app = express();

const routes = require("./src/routes/puntuaciones.routes");
const prisma = require("./src/config/database");
const createProxyHandler = require("./src/proxy-handler");

const cors = require("cors");

app.use(cors());

app.use(express.json());

// Proxy público: agrega la API key del lado servidor y reenvía al endpoint interno.
app.get(
  "/api/top-puntuaciones",
  createProxyHandler("top-puntuaciones", "GET")
);
app.get(
  "/api/all-puntuaciones",
  createProxyHandler("all-puntuaciones", "GET")
);
app.post(
  "/api/all-puntuaciones",
  createProxyHandler("all-puntuaciones", "GET, POST")
);

app.use(routes);

async function startDatabase() {
  try {
    await prisma.$connect();
    console.log(
      "Conexión establecida con la base de datos (PostgreSQL) a través de Prisma."
    );
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
  }
}

startDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en puerto ${process.env.PORT}`);
});

module.exports = app;
