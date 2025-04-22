"use server"

import { resetPasswordGateway } from "@nexura/grpc_gateway/gateway"
import { emailSchema, resetPasswordSchema, verificationSchema } from "./forgotPasswordFormSchema"


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

  const response = await resetPasswordGateway(parsedData.data.email, parsedData.data.password, parsedData.data.token)
  if (!response.success) {
    return {
      message: response.message,
      success: false,
    }
  }
  return {message: "Reset password successful", success: true}
}
