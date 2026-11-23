const crypto = require("crypto");

const verificarApiKey = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  const expectedApiKey = process.env.API_KEY;

  if (!apiKey || !expectedApiKey || !seguroIgual(apiKey, expectedApiKey)) {
    return res.status(403).json({ error: "API key inválida o faltante" });
  }

  next();
};

// Comparación en tiempo constante para evitar ataques de timing.
function seguroIgual(a, b) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  if (bufferA.length !== bufferB.length) {
    return false;
  }

  return crypto.timingSafeEqual(bufferA, bufferB);
}

module.exports = { verificarApiKey };
