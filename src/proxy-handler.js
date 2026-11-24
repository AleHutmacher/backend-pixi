module.exports = function createProxyHandler(endpoint, allowedMethods) {
  return async function proxyHandler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", `${allowedMethods}, OPTIONS`);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }

    if (!allowedMethods.split(", ").includes(req.method)) {
      res.setHeader("Allow", `${allowedMethods}, OPTIONS`);
      return res.status(405).json({ error: "Método no permitido" });
    }

    const backendUrl = process.env.BACKEND_URL;
    const apiKey = process.env.API_KEY;

    if (!backendUrl || !apiKey) {
      console.error("Faltan BACKEND_URL o API_KEY en las variables de entorno");
      return res.status(500).json({ error: "Configuración del proxy incompleta" });
    }

    try {
      const upstream = await fetch(
        `${backendUrl.replace(/\/+$/, "")}/${endpoint}`,
        {
          method: req.method,
          headers: {
            "x-api-key": apiKey,
            "content-type": "application/json",
          },
          body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
        }
      );

      const responseBody = await upstream.json().catch(() => null);
      return res.status(upstream.status).json(responseBody);
    } catch (error) {
      console.error("Error reenviando la petición al backend:", error);
      return res.status(502).json({ error: "No se pudo contactar la API" });
    }
  };
};
