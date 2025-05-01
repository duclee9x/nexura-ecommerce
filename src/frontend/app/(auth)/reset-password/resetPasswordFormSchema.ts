import { z } from "zod"


// Email form validation schema
const emailSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
})

// Verification code form validation schema
const verificationSchema = z.object({
  code: z.string().trim().min(6, "Verification code must be at least 6 characters"),
})

export { emailSchema, verificationSchema }

// Reset password form validation schema
const resetPasswordSchema = z.object({
  password: z.string().trim().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().trim().min(8, "Confirm password must be at least 8 characters"),
  token: z.string().trim().min(12, "Token is invalid"),
  email: z.string().trim().email("Please enter a valid email address"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
})

export { resetPasswordSchema }
