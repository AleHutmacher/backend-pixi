const { PrismaClient } = require("@prisma/client");

// Instancia única de PrismaClient compartida por toda la aplicación.
const prisma = new PrismaClient();

module.exports = prisma;
