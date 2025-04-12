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