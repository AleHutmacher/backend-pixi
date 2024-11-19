const verificarApiKey = (req, res, next) => {
    const apiKey = req.header("x-api-key"); // O puedes usar otro encabezado si lo prefieres
  
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(403).json({ error: "API key inválida o faltante" });
    }
  
    next(); // Continuar con la solicitud si la API key es válida
  };

  module.exports = { verificarApiKey };