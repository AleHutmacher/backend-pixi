module.exports = async function handler(req, res) {
  const BACKEND_URL = process.env.BACKEND_URL;
  const API_KEY = process.env.API_KEY;

  // CORS abierto: la API no usa credenciales y la clave va oculta del lado del servidor.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight (el POST con JSON lo dispara)
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const pathname = req.url.split("?")[0].replace(/^\/api/, "");
  const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";

  try {
    const upstream = await fetch(`${BACKEND_URL}${pathname}${query}`, {
      method: req.method,
      headers: {
        "x-api-key": API_KEY,
        "content-type": "application/json",
      },
      body: req.method === "GET" ? undefined : JSON.stringify(req.body),
    });

    const data = await upstream.json().catch(() => null);
    return res.status(upstream.status).json(data);
  } catch (error) {
    console.error(error);
    return res.status(502).json({ error: "No se pudo contactar la API" });
  }
};
