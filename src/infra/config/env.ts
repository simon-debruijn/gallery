import { z, ZodError } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),
  PORT: z
    .string()
    .transform((it) => Number.parseInt(it))
    .optional(),
  DATABASE_URL: z.string(),
});

function parseEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(
        "The following environment variables are missing:",
        error.issues.flatMap((issue) => issue.path).join(", "),
      );
      throw new Error("Missing environment variables");
    }

    throw error;
  }
}

export const ENV = parseEnv();
