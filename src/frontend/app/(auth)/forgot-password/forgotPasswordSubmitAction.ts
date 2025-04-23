"use server"

import { resetPasswordGateway } from "@nexura/grpc_gateway/gateway"
import { emailSchema, resetPasswordSchema, verificationSchema } from "./forgotPasswordFormSchema"
import { useUserActions } from "@/hooks/use-user"

export type FormState = {message: string, success: boolean, field?: Record<string, string>, issue?: string[]}
export async function handleSubmitEmailAction(prev: FormState, data: FormData) :Promise<FormState> {
  const parsedData = emailSchema.safeParse({email: data.get('email')})
  
  if (!parsedData.success) {
    return {
      message: "Invalid user credentials", 
      success: false, 
      field: {email: data.get('email')?.toString() ?? ""}, 
      issue: parsedData.error.issues.map(issue => issue.message)
    }
  }
  
  return {message: "Email sent", success: true}
}

export async function handleSubmitVerificationAction(prev: FormState, data: FormData) :Promise<FormState> {
  const parsedData = verificationSchema.safeParse({code: data.get('code')})

  if (!parsedData.success) {
    return {
      message: "Invalid verification code", 
      success: false, 
      field: {code: data.get('code')?.toString() ?? ""}, 
      issue: parsedData.error.issues.map(issue => issue.message)
    }
  }

  return {message: "Verification successful", success: true}
}


export async function handleSubmitResetPasswordAction(prev: FormState, data: FormData) :Promise<FormState> {

  const parsedData = resetPasswordSchema.safeParse({password: data.get('password'), confirmPassword: data.get('confirmPassword'), token: data.get('token'), email: data.get('email')})

  if (!parsedData.success) {
    return {
      message: "Invalid reset password", 
      success: false, 
      field: {password: data.get('password')?.toString() ?? "", confirmPassword: data.get('confirmPassword')?.toString() ?? "", token: data.get('token')?.toString() ?? "", email: data.get('email')?.toString() ?? ""}, 
      issue: parsedData.error.issues.map(issue => issue.message)
    }
  }

  const { resetPassword } = useUserActions()
  const {mutate: resetPasswordMutation} = resetPassword
  try {
    resetPasswordMutation({ email: parsedData.data.email, newPassword: parsedData.data.password, token: parsedData.data.token })
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An unknown error occurred",
      success: false,
    }
  }
  return {message: "Reset password successful", success: true}
}
