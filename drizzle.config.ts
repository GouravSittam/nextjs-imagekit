import {type Config} from "drizzle-kit";

import {env} from "@/env";

export default {
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  strict: true,
} satisfies Config;
