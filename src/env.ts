import {z} from "zod/v4";

const envSchema = z.object({
  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: z
    .string()
    .min(1, "ImageKit public key is required"),
  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: z.url("Must be a valid URL"),
  IMAGEKIT_PRIVATE_KEY: z.string().min(1, "ImageKit private key is required"),
  DATABASE_URL: z.url("Database URL is missing"),
  LOG_LEVEL: z.string().min(1, "Log level is required"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_RUNTIME: z.enum(["edge", "nodejs"]).optional(),
});

const createEnv = () => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(z.prettifyError(parsed.error));
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
};

export const env = createEnv();
export type Env = z.infer<typeof envSchema>;
