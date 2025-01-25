import { z } from "zod";

export const emailSchema = z
  .string()
  .email()
  .min(1, "Email is required")
  .max(255, "Email must be less than 255 characters");

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/\d/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain at least one special character",
  });

// Infer the types from Zod schemas
export type EmailType = z.infer<typeof emailSchema>;
export type PasswordType = z.infer<typeof passwordSchema>;
