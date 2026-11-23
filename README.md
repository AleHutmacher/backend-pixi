# pixi-backend

API REST para gestionar puntuaciones de un juego (estilo "top scores").

## Stack

- Node.js + Express
- Prisma ORM sobre PostgreSQL
- Joi (validación)
- Desplegable en Vercel

## Variables de entorno

Copiá `.env.example` a `.env` y completá los valores.

| Variable | Descripción |
|----------|-------------|
| `API_KEY` | Clave que los clientes deben enviar en el header `x-api-key`. |
| `PORT` | Puerto local (Vercel lo asigna en producción). |
| `POSTGRES_PRISMA_URL` | URL de conexión a PostgreSQL (con pooling). |
| `POSTGRES_URL_NON_POOLING` | URL de conexión directa (para migraciones). |

Para generar una API key nueva:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Endpoints

Todos los endpoints requieren el header `x-api-key` con la `API_KEY` definida en `.env`.

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/all-puntuaciones` | Devuelve todas las puntuaciones. |
| `GET` | `/top-puntuaciones` | Devuelve las 5 mejores (ordenadas de mayor a menor). |
| `POST` | `/all-puntuaciones` | Crea una puntuación. Body: `{ "nombre": "ABC", "puntuacion": 100 }`. |

## Scripts

```bash
npm install       # instala dependencias y genera el cliente Prisma
npm run dev       # arranca con nodemon
npm start         # arranca en producción
npm run build     # genera el cliente Prisma
```
