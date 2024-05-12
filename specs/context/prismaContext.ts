
import { join } from "path";
import { execSync } from "child_process";
import prismaClient from '../../prisma/index';

export function prismaTestContext() {
  const prismaBinary = join(__dirname, "..", "..", "node_modules", ".bin", "prisma");
  return {
    async before() {
      process.env.DATABASE_URL = process.env.TESTING_DATABASE_URL;
      execSync(`${prismaBinary} migrate dev --name create_models`, { env: process.env });

      return prismaClient;
    },
    async after() {
      if (prismaClient) {
        await prismaClient.user.deleteMany({});
        await prismaClient.$disconnect();
      }
    },
  };
}