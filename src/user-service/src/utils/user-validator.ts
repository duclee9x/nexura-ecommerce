import { z } from 'zod';
import { verifyAccessToken } from './jwt-utils';

export const GetUserSchema = z.object({
    id: z.number().int().positive(),
});

export const UpdateUserSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
});

export const DeleteUserSchema = z.object({
    id: z.number().int().positive(),
});

export const RegisterUserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

export const LoginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});



export type GetUserInput = z.infer<typeof GetUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type DeleteUserInput = z.infer<typeof DeleteUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
export type LoginUserInput = z.infer<typeof LoginUserSchema>; 