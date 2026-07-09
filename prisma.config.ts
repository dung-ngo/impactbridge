import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const directUrl = process.env.DIRECT_URL;

if (!directUrl) {
  throw new Error("DIRECT_URL is missing. Use Neon DATABASE_URL_UNPOOLED.");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",

    // This tells `prisma db seed` which script to run.
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Prisma CLI commands like migrate/seed will use the direct Neon URL.
    url: directUrl,
  },
});
