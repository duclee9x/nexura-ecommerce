'use server'

import { z } from "zod"
import { User } from "@/protos/nexura"
import { updateUserGateway } from "@/gateway/gateway"
import { revalidatePath } from "next/cache"

export type FormState = {
    message: string
    success: boolean
    errors?: Record<string, string>
}


const personalFormSchema = z.object({
    userId: z.string(),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
    gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Please select a valid gender" })
    }).optional(),
    dateOfBirth: z.string().refine((val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
    }, {
        message: "Invalid date format"
    }).optional(),
    profilePictureUrl: z.string().optional(),
})

type UpdateUserRequest = {
    id: string;
    user: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        gender: string | null;
        dateOfBirth: string | null;
        profilePictureUrl: string | null;
    };
    currentPassword: string | null;
    newPassword: string | null;
}



export async function onPersonalSubmitAction(prev: FormState, request: UpdateUserRequest): Promise<FormState> {
    const validatedFields = personalFormSchema.safeParse({
        userId: request.id,
        firstName: request.user.firstName,
        lastName: request.user.lastName,
        phone: request.user.phone,
        gender: request.user.gender,
        dateOfBirth: request.user.dateOfBirth,
        profilePictureUrl: request.user.profilePictureUrl
    })

    if (!validatedFields.success) {
        const fieldErrors: Record<string, string> = {}
        validatedFields.error.issues.forEach(issue => {
            const field = issue.path[0].toString()
            fieldErrors[field] = issue.message
        })

        return {
            message: "Please fix the validation errors",
            success: false,
            errors: fieldErrors
        }
    }

    try {
        await updateUserGateway(
            request.id,
            request.user as User,
            request.currentPassword || '',
            request.newPassword || ''
        );
        
        return {
            message: "Profile updated successfully",
            success: true
        }
    } catch (error) {
        return {
            message: error instanceof Error ? error.message : "Profile update failed",
            success: false,
            errors: {
                submit: "Failed to update profile"
            }
        }
    }
} 

