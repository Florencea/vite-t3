# Vite T3

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-%232596BE.svg?style=for-the-badge&logo=tRPC&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

- A fullstack project like T3 stack

## Usage (in `.env`)

- Use as fullstack

```sh
ENABLE_CLIENT=1
ENABLE_SERVER=1
ENABLE_OPENAPI=1
```

- Use as restful backend server(with openapi)

```sh
ENABLE_CLIENT=0
ENABLE_SERVER=1
ENABLE_OPENAPI=1
```

- Use as restful backend server(without openapi)

```sh
ENABLE_CLIENT=0
ENABLE_SERVER=1
ENABLE_OPENAPI=0
```

- Use as client(not recommended, you must modefied `src/client/providers.tsx` to disable trpc and implement api strategy and proxy)

```sh
ENABLE_CLIENT=1
ENABLE_SERVER=0
ENABLE_OPENAPI=0
```
