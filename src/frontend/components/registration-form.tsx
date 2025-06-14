"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form as UIForm, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { onRegisterSubmitAction } from "@/app/register/registerSubmit"
import { registrationFormSchema } from "@/app/register/registrationFormSchema"
import Form from "next/form"
type RegistrationFormValues = z.infer <typeof registrationFormSchema>

export function RegistrationForm() {
  const [
    state, formAction, isPending
  ] = useActionState(onRegisterSubmitAction, { message: "", success: false, field: {}, issue: [] })
  const [ showPassword, setShowPassword ] = useState(false)
  const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)

  const form = useForm<RegistrationFormValues>({
    resolver:      zodResolver(registrationFormSchema),
    defaultValues: {
      firstName:       "",
      lastName:        "",
      email:           "",
      phone:           "",
      password:        "",
      confirmPassword: "",
      acceptTerms:     false,
      acceptMarketing: false,
      ...(state?.field ?? {}),
    },
    mode: "onBlur",
  }) 

  return (
    <UIForm {...form}>
      <Form action={formAction} className="space-y-6">
        {!state?.success && state?.message && (
          <div className="text-error text-center">
            <p className="text-sm">{state.message}</p>
          </div>
        )}
        {state?.issue?.map((issue: string, index: number) => (
          <p key={index} className="text-sm text-error text-center">
            {issue}
          </p>
        ))}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="firstName">
                  First Name <span className="text-status-error">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                  
                    autoComplete="given-name"
                    id="firstName"
                    {...field}
                    disabled={state?.success}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="lastName">
                  Last Name <span className="text-status-error">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="family-name"
                    id="lastName"
                    {...field}
                    disabled={state?.success}
                  />
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
            <FormItem className="space-y-2">
              <FormLabel htmlFor="email">
                Email <span className="text-status-error">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...field}
                  disabled={state?.success}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="phone">Phone Number (optional)</FormLabel>
              <FormControl>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  {...field}
                  disabled={state?.success}
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
            <FormItem className="space-y-2">
              <FormLabel htmlFor="password">
                Password <span className="text-status-error">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...field}
                    disabled={state?.success}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-base"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="confirmPassword">
                Confirm Password <span className="text-status-error">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...field}
                    disabled={state?.success}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-base"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    {...form.register('acceptTerms')}
                    id="acceptTerms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={state?.success}
                  />
                </FormControl>
                <div className="grid gap-1.5 leading-none">
                  <FormLabel htmlFor="acceptTerms">
                    I agree to the{" "}
                    <a tabIndex={-1} href="/terms" className="text-muted hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a tabIndex={-1} href="/privacy" className="text-muted hover:underline">
                      Privacy Policy
                    </a>{" "}
                    <span className="text-status-error">*</span>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptMarketing"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    {...form.register('acceptMarketing')}
                    id="acceptMarketing"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={state?.success}
                  />
                </FormControl>
                <div className="grid gap-1.5 leading-none">
                  <FormLabel htmlFor="acceptMarketing">
                    I want to receive promotional emails about products, services, and events
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        {!state?.success ? (<Button
          type="submit"
          className="w-full btn-primary"
          disabled={state?.success}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
            </>
          )}
        </Button>
        ) : (
          <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
            <h3 className="text-success font-medium mb-2">Account Created Successfully!</h3>
            <p className="text-sm text-text-base">
              We've sent a verification link to your email address. Please check your inbox and click the link to activate your account.
            </p>
            <p className="text-sm text-text-muted mt-2">
              If you don't see the email, please check your spam folder.
            </p>
          </div>
        )}
      </Form>
    </UIForm>
  )
}

