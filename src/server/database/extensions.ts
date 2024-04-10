import { Prisma } from "@prisma/client";
import argon2 from "argon2";

export const softDeleteExtension = () => {
  return Prisma.defineExtension({
    name: "soft-delete",
    query: {
      $allModels: {
        aggregate: async ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        count: async ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        findFirstOrThrow: async ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        findUniqueOrThrow: async ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        findUnique: async ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        findFirst: async ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        findMany: async ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        groupBy: async ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        delete: async ({ args, model }) => {
          const modelLowerCase = model.toLowerCase() as Uncapitalize<
            typeof model
          >;
          // @ts-expect-error: Requires more types from Prisma
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          return await prisma[modelLowerCase].update({
            ...args,
            data: { deletedAt: new Date() },
          });
        },
        deleteMany: async ({ args, model }) => {
          const modelLowerCase = model.toLowerCase() as Uncapitalize<
            typeof model
          >;
          // @ts-expect-error: Requires more types from Prisma
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          return await prisma[modelLowerCase].updateMany({
            ...args,
            data: { deletedAt: new Date() },
          });
        },
      },
    },
  });
};

export const userCreateExtension = () => {
  return Prisma.defineExtension({
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
