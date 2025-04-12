"use server"

import { emailSchema, verificationSchema } from "./forgotPasswordFormSchema"
import { redirect } from "next/navigation"


export type FormState = {message: string, success: boolean, field?: Record<string, string>, issue?: string[]}
export async function handleSubmitEmailAction(prev: FormState, data: FormData) :Promise<FormState> {
  const parsedData = emailSchema.safeParse({email: data.get('email')})
  
  if (!parsedData.success) {
    return {message: "Invalid user credentials", success: false, field: {email: parsedData.data?.email ?? ""}, issue: parsedData.error.issues.map(issue => issue.message)}
  }
  
  return {message: "Email sent", success: true}
}

export async function handleSubmitVerificationAction(prev: FormState, data: FormData) :Promise<FormState> {
  const parsedData = verificationSchema.safeParse({code: data.get('code')})

  if (!parsedData.success) {
    return {message: "Invalid verification code", success: false, field: {code: parsedData.data?.code ?? ""}, issue: parsedData.error.issues.map(issue => issue.message)}
  }

  return {message: "Verification successful", success: true}
}


