const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const controller = {};

const getPuntuaciones = async (req, res) => {
  try {
    const puntuaciones = await prisma.puntuaciones.findMany();
    res.json(puntuaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las puntuaciones" });
  }
};
controller.getPuntuaciones = getPuntuaciones;

const getTopPuntuaciones = async (req, res) => {
  try {
    const puntuaciones = await prisma.puntuaciones.findMany({
      orderBy: {
        puntuacion: "desc",
      },
      take: 5,
    });
    res.json(puntuaciones);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener las mejores puntuaciones" });
  }
};
controller.getTopPuntuaciones = getTopPuntuaciones;

const createPuntuaciones = async (req, res) => {
  try {
    const { nombre, puntuacion } = req.body;
    const nuevaPuntuacion = await prisma.puntuaciones.create({
      data: {
        nombre,
        puntuacion,
      },
    });
    res.status(201).json(nuevaPuntuacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la puntuación" });
  }
};
controller.createPuntuaciones = createPuntuaciones;

module.exports = controller;
