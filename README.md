# Vite T3

A fullstack project inspired by the T3 stack, built with Vite, React, tRPC, Prisma, and Express.

## Quick Start

The required Node.js version is specified in the `engines` field of `package.json`

```sh
# 1. Install dependencies & initialize setup
npm run setup

# 2. Environment Variables
cp .env.example .env

# 3. Database Migration & Seeding
npm run db:migrate
npm run db:seed

# 4. Start Development Server
npm run dev
```

## Project Structure

- `src/client/`: Frontend (React, Vite, TailwindCSS)
- `src/server/`: Backend (Express, tRPC, OpenAPI)
- `src/locales/`: i18n configurations
- `prisma/`: Database schema & SQLite

## Core Scripts

- `npm run dev`: Start development server (`--watch` mode).
- `npm run build`: Typecheck, lint, and build for production.
- `npm run start`: Start production server.
- `npm run db:studio`: Open Prisma Studio.

*Note: You can toggle frontend, backend, and OpenAPI modules by modifying `ENABLE_CLIENT`, `ENABLE_SERVER`, and `ENABLE_OPENAPI` in your `.env` file.*
