import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import argon2 from "argon2";
import "dotenv/config";
import { PrismaClient } from "../../../prisma/generated/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter }).$extends({
    name: "user-create",
    query: {
      user: {
        create: async ({ args, query }) => {
          const password = await argon2.hash(args.data.password);
          args.data = { ...args.data, password };
          return query(args);
        },
        upsert: async ({ args, query }) => {
          const password = await argon2.hash(args.create.password);
          args.create = {
            ...args.create,
            password,
          };
          args.update = {
            ...args.update,
            password,
          };
          return query(args);
        },
      },
    },
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
