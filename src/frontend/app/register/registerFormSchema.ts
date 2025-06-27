import { z } from "zod"
export const registerSchema = z.object({
  email:           z.string().email("Invalid email address"),
  password:        z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  firstName:       z.string().min(1, "First name is required"),
  lastName:        z.string().min(1, "Last name is required"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path:    ["confirmPassword"],
})
export type RegisterFormValues = z.infer<typeof registerSchema>
