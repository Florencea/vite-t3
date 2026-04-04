# Vite T3

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-%232596BE.svg?style=for-the-badge&logo=tRPC&logoColor=white)
![Tanstack](https://img.shields.io/badge/Tanstack-%23FF4154.svg?style=for-the-badge&logo=react-query&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-%2326A69A.svg?style=for-the-badge&logo=i18next&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)

A fullstack project inspired by the T3 stack, built with Vite, React, tRPC, Prisma, and Express.

## Table of Contents

- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Available Scripts](#️-available-scripts)
- [Configuration](#️-configuration)
- [License](#️-license)

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **PNPM** (Used as the package manager)

### Installation & Setup

1. **Install dependencies**

```sh
pnpm install
```

2. **Environment Variables**

Copy `.env.example` to `.env` and configure your environment variables (especially the `DATABASE_URL`).

```sh
cp .env.example .env
```

3. **Initialize the Database**

This project uses Prisma with SQLite. Run the following commands to run migrations and seed the database with initial data:

```sh
pnpm migrate
pnpm seed
```

4. **Start the Development Server**

```sh
pnpm dev
```

Once started, both the frontend and backend will run concurrently in the development environment.

---

## Project Structure

A brief overview of the core directories:

- `src/client/`: Frontend React code (components, routes, global state, and styles).

- `src/server/`: Backend Express code (tRPC routers, middlewares, and OpenAPI configuration).

- `src/locales/`: Internationalization (i18n) configuration files (e.g., `en-US.ts`, `zh-TW.ts`).

- `prisma/`: Database ORM models (`schema.prisma`) and database configurations.

- `public/`: Static assets.

---

## API Documentation

If `ENABLE_OPENAPI=1` is set in your `.env` file, the project automatically integrates Swagger UI upon startup.

You can view and test the auto-generated RESTful API endpoints by navigating to the designated OpenAPI route in your browser (typically `http://localhost:<PORT>/opanapi`, depending on the `DOC_ROUTE` variable).

---

## Available Scripts

In the project directory, you can run:

- `pnpm dev`: Starts the development server using Node native `--watch` mode.

- `pnpm build`: Runs the linter and builds the application for production.

- `pnpm start`: Starts the compiled production server.

- `pnpm migrate:` Runs database migrations and generates the Prisma Client.

- `pnpm seed`: Seeds the database with initial test data.

- `pnpm lint`: Runs ESLint and the TypeScript compiler to check code quality.

- `pnpm format`: Formats all supported files using Prettier.

---

## Configuration

You can toggle the application's startup modules by modifying the variables in the `.env` file:

- **Use as fullstack (Recommended default)**

```sh
ENABLE_CLIENT=1
ENABLE_SERVER=1
ENABLE_OPENAPI=1
```

- **Use as a RESTful backend server (with OpenAPI)**

```sh
ENABLE_CLIENT=0
ENABLE_SERVER=1
ENABLE_OPENAPI=1
```

- **Use as a RESTful backend server (without OpenAPI)**

```sh
ENABLE_CLIENT=0
ENABLE_SERVER=1
ENABLE_OPENAPI=0
```

- **Use as a client (Pure frontend)**

(Not recommended. If you use this mode, you must manually modify `src/client/providers.tsx` to disable tRPC and implement your own API request strategy and proxy).

```sh
ENABLE_CLIENT=1
ENABLE_SERVER=0
ENABLE_OPENAPI=0
```

---

## License

This project is licensed under the **MIT License**.
