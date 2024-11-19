require("dotenv").config();

const express = require("express");
const app = express();

const routes = require("./src/routes/puntuaciones.routes");

const initGlobalApiKey = require("./src/config/apikey");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());



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
initGlobalApiKey();

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en puerto ${process.env.PORT}`);
});
