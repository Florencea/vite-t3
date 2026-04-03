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

- A fullstack project like T3 stack (Vite + React + tRPC + Prisma + Express)

## Available Scripts

In the project directory, you can run:

- `pnpm dev`: Starts the development server using Node native watch mode and `tsx`.
- `pnpm build`: Lints the code, checks types, and builds the app for production.
- `pnpm start`: Starts the compiled production server.
- `pnpm migrate`: Runs database migrations and generates Prisma client.
- `pnpm seed`: Seeds the database with initial data.
- `pnpm lint`: Runs ESLint and TypeScript compiler checks.
- `pnpm format`: Formats code using Prettier.

## Configuration (`.env`)

You can toggle the behavior of the application by configuring the `.env` file:

- **Use as fullstack**

```sh
ENABLE_CLIENT=1
ENABLE_SERVER=1
ENABLE_OPENAPI=1
```

- **Use as restful backend server (with OpenAPI)**

```sh
ENABLE_CLIENT=0
ENABLE_SERVER=1
ENABLE_OPENAPI=1
```

- **Use as restful backend server (without OpenAPI)**

```sh
ENABLE_CLIENT=0
ENABLE_SERVER=1
ENABLE_OPENAPI=0
```

- **Use as client (Not recommended, you must modify src/client/providers.tsx to disable tRPC and implement your own API strategy and proxy)**

```sh
ENABLE_CLIENT=1
ENABLE_SERVER=0
ENABLE_OPENAPI=0
```
