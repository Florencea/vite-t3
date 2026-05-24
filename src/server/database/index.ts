import { PrismaLibSql } from "@prisma/adapter-libsql";
import argon2 from "argon2";
import "dotenv/config";
import { PrismaClient } from "../../../prisma/generated/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaLibSql({
  url: connectionString,
});

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
          if (typeof args.create.password === "string") {
            args.create.password = await argon2.hash(args.create.password);
          }
          if (args.update.password) {
            if (typeof args.update.password === "string") {
              args.update.password = await argon2.hash(args.update.password);
            } else if (
              typeof args.update.password === "object" &&
              "set" in args.update.password &&
              typeof args.update.password.set === "string"
            ) {
              args.update.password.set = await argon2.hash(
                args.update.password.set,
              );
            }
          }
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
