import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Required to make the above `global` declaration valid in an ESM-based project
export {};
