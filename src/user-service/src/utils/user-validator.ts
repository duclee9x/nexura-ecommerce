import { z } from 'zod';
import { verifyAccessToken } from './jwt-utils';

export const GetUserSchema = z.object({
    id: z.string(),
});

export const UpdateUserSchema = z.object({
    id: z.string(),
    user: z.object({
        firstName: z.string().min(2).optional(),
        lastName: z.string().min(2).optional(),
        phone: z.string().min(10).optional(),
        gender: z.enum(["male", "female", "other"]).optional(),
        dateOfBirth: z.string().optional(),
        profilePictureUrl: z.string().optional(),
    }),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
});

export const DeleteUserSchema = z.object({
    id: z.string(),
});

export const RegisterUserSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(100, { message: 'Password must be less than 100 characters long' }),
});

export const LoginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const UpdatePasswordSchema = z.object({
    email: z.string().email(),
    currentPassword: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    )
    .min(8, "Must be at least 8 characters in length"),
    newPassword: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    )
    .min(8, "Must be at least 8 characters in length"),
}).refine((data) => {
    if (data.newPassword == data.currentPassword) {
        return false;
    }
    return true;
}, { message: 'New password must be different from current password' });

export type GetUserInput = z.infer<typeof GetUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type DeleteUserInput = z.infer<typeof DeleteUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type UpdatePasswordInput = z.infer<typeof UpdatePasswordSchema>;