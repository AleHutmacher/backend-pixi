const { Redis } = require("@upstash/redis");
const { Ratelimit } = require("@upstash/ratelimit");

// Rate limiting por IP (30 peticiones por minuto).
// Solo se activa si están configuradas las variables de Upstash Redis.
let ratelimit = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(30, "1 m"),
  });
}

module.exports = async function handler(req, res) {
  const BACKEND_URL = process.env.BACKEND_URL;
  const API_KEY = process.env.API_KEY;
  const CORS_ORIGIN = process.env.CORS_ORIGIN;

  // CORS hacia el front (GitHub Pages)
  if (CORS_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", CORS_ORIGIN);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight (el POST con JSON lo dispara)
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Rate limiting (fail-open: si falla o no está configurado, seguimos)
  if (ratelimit) {
    try {
      const ip =
        (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
        req.socket?.remoteAddress ||
        "unknown";

      const { success, limit, remaining, reset } = await ratelimit.limit(
        `rl:${ip}`
      );

      res.setHeader("X-RateLimit-Limit", limit);
      res.setHeader("X-RateLimit-Remaining", remaining);
      res.setHeader("X-RateLimit-Reset", new Date(reset).toISOString());

      if (!success) {
        return res
          .status(429)
          .json({ error: "Demasiadas peticiones. Intentá de nuevo más tarde." });
      }
    } catch (error) {
      console.error("Error en el rate limiting:", error);
    }
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
