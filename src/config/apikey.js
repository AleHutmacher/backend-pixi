const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function initGlobalApiKey() {
  try {
    // Busca la API key en la base de datos
    const apiKeySetting = await prisma.settings.findUnique({
      where: { key: "apiKey" },
    });

    // Si no existe, genera una nueva
    if (!apiKeySetting) {
      // Genera una nueva API key
      const apiKey = crypto.randomBytes(16).toString("hex");

      // Guarda la API key en la base de datos
      await prisma.settings.create({
        data: {
          key: "apiKey",
          value: apiKey,
        },
      });

      console.log("Nueva API Key global generada:", apiKey);
      return apiKey;
    } else {
      console.log("API Key global ya existe:", apiKeySetting.value);
      return apiKeySetting.value;
    }
  } catch (error) {
    console.error("Error inicializando la API Key global:", error);
  }
}

module.exports = initGlobalApiKey;
