import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(4000),
  CLIENT_URL: z.string().default("http://localhost:3000"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  REDIS_URL: z.string().min(1, "REDIS_URL is required"),
  GEMINI_API_KEYS: z
    .string()
    .min(1, "GEMINI_API_KEYS is required")
    .transform((value) =>
      value
        .split(",")
        .map((key) => key.trim())
        .filter(Boolean)
    )
    .refine((keys) => keys.length > 0, "At least one Gemini API key is required"),
  GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  console.error(`Invalid environment configuration:\n${issues}`);
  process.exit(1);
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === "production";
