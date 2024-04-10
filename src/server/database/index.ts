import { PrismaClient } from "@prisma/client";
import { softDeleteExtension, userCreateExtension } from "./extensions.js";

const prismaClientSingleton = () => {
  return new PrismaClient({ errorFormat: "minimal" })
    .$extends(softDeleteExtension())
    .$extends(userCreateExtension());
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
