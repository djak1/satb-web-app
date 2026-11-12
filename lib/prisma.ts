//This file is neccessary from prisma in next js. it set up type definitions for prisma
//using extension acccelerate package, this file allows us using prisma client
import { PrismaClient } from "../app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export { prisma };