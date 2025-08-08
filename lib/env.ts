import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(15),
    BETTER_AUTH_URL: z.string().url(),
    GITHUB_CLIENT_ID: z.string().min(10),
    GITHUB_CLIENT_SECRET: z.string().min(20),
    CLOUDINARY_URL: z.string().startsWith("cloudinary://"),
    EMAIL_USER: z.string().email(),
    EMAIL_PASS: z.string().min(5),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  // client: {
  //   NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL: z.string().url(),
  //   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string().min(1),
  //   NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  //   NEXT_PUBLIC_API_URL: z.string().url(),
  // },
  experimental__runtimeEnv: {
    // NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,
    // NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    // NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
