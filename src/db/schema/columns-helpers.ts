import {pgEnum, timestamp} from "drizzle-orm/pg-core";

export const mediaTypeEnum = pgEnum("media_type", ["IMAGE", "VIDEO"]);

export const timestamps = {
  createdAt: timestamp("created_at", {mode: "string"}).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {mode: "string"}).defaultNow().notNull(),
};
