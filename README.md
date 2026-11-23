# pixi-backend

API REST para gestionar puntuaciones de un juego (estilo "top scores").

## Stack

- Node.js + Express
- Prisma ORM sobre PostgreSQL
- Joi (validación)
- Desplegable en Vercel

## Arquitectura

El backend expone dos capas:

1. **Proxy público** (`/api/*`) — Vercel Functions que consume el frontend. Guarda la `API_KEY` del lado del servidor, habilita CORS abierto (`*`) y reenvía la petición a los endpoints internos.
2. **API interna** (`/all-puntuaciones`, `/top-puntuaciones`) — rutas de Express protegidas con `x-api-key`. No las consume el navegador directamente.

## Variables de entorno

Copiá `.env.example` a `.env` y completá los valores. En Vercel, configurá las mismas variables en **Settings → Environment Variables**.

| Variable | Descripción |
|----------|-------------|
| `API_KEY` | Clave que valida los endpoints internos (header `x-api-key`). |
| `BACKEND_URL` | URL pública del propio backend en Vercel (ej. `https://backend-pixi.vercel.app`). La usa el proxy para reenviar. |
| `PORT` | Puerto local (Vercel lo asigna en producción). |
| `POSTGRES_PRISMA_URL` | URL de conexión a PostgreSQL (con pooling). |
| `POSTGRES_URL_NON_POOLING` | URL de conexión directa (para migraciones). |

Para generar una API key nueva:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Endpoints

### Públicos (los que consume el frontend)

Pasan por el proxy, que internamente llama a los endpoints internos con la `API_KEY`.

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/all-puntuaciones` | Devuelve todas las puntuaciones. |
| `GET` | `/api/top-puntuaciones` | Devuelve las 5 mejores (ordenadas de mayor a menor). |
| `POST` | `/api/all-puntuaciones` | Crea una puntuación. Body: `{ "nombre": "ABC", "puntuacion": 100 }`. |

### Internos (protegidos con `x-api-key`)

| Método | Ruta |
|--------|------|
| `GET` | `/all-puntuaciones` |
| `GET` | `/top-puntuaciones` |
| `POST` | `/all-puntuaciones` |

## Scripts

```bash
npm install       # instala dependencias y genera el cliente Prisma
npm run dev       # arranca con nodemon
npm start         # arranca en producción
npm run build     # genera el cliente Prisma
```
