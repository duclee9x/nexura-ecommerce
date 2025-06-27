"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import Link from "next/link"

import { useForm } from "react-hook-form"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import UserHooks from "@/hooks/user-hooks"

import { RegisterFormValues, registerSchema } from "./registerFormSchema"

import { useState } from "react"

export default function RegisterPage() {
  const { useRegisterUser } = UserHooks()
  const { mutateAsync: registerUser } = useRegisterUser
  const form = useForm<RegisterFormValues>({
    resolver:      zodResolver(registerSchema),
    defaultValues: {
      email:           "",
      password:        "",
      confirmPassword: "",
      firstName:       "",
      lastName:        "",
    },
  })

  // Step 0: Register, Step 1: OTP
  const [step, setStep] = useState(0)
  const [registeredEmail, setRegisteredEmail] = useState("")

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser({
        firstName: data.firstName,
        lastName:  data.lastName,
        email:     data.email,
        password:  data.password,
      })
      toast.success("Send verification code to email successfully")
      setRegisteredEmail(data.email)
      setStep(1)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to register")
    }
  }



  return (
    <div className="container flex h-full w-screen flex-col items-center justify-center py-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {step === 0 ? "Register" : "Verify Email"}
          </CardTitle>
          <CardDescription>
            {step === 0 ? "Create a new account to get started" : "Your account is created but not verified yet"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 0 ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
          ) : (
            <p className="text-sm text-muted-foreground">
              A verification email has been sent to <span className="font-semibold">{registeredEmail}</span>. Please check your inbox to verify your account.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {step === 0 ? (
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  )
} 