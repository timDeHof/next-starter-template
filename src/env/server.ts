import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { ZodError, z } from "zod";

expand(config());

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().min(1),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_NAME: z.string().min(1),
    DB_MIGRATING: z
      .string()
      // only allow "true" or "false"
      .refine((s) => s === "true" || s === "false")
      // transform to boolean
      .transform((s) => s === "true")
      .optional(),
    DATABASE_URL: z.string().url().min(1),
  },
  onValidationError: (error: ZodError) => {
    console.error("❌ Invalid environment variables:", error.flatten().fieldErrors);
    process.exit(1);
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
