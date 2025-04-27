"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/use-toast"

// 1. Updated Zod Schema (no confirmPassword)
const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().min(8, {
    message: "Phone number must be at least 8 digits",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to continue",
  }),
})

type SignUpFormValues = z.infer<typeof signUpSchema>;

// 2. API call
const signup = async (data: { name: string; email: string; phone: string; password: string }) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error(errorData.message || "Signup failed");
    }

    return response.json();
  } catch (error) {
    console.error("Error in signup function:", error);
    throw new Error("Signup failed");
  }
}

export function SignupForm() {
  const router = useRouter()
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      acceptTerms: false,
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data: { name: string; email: string; phone: string; password: string }) => signup(data),
    onSuccess: () => {
      toast({
        description: "Account created successfully! Please login.",
      });
      router.push("/auth/login"); 
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || "An error occurred",
      });
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    try {
      setIsLoading(true);
      console.log("Signup Form data:", data);

      signUpMutation.mutate({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast({
        variant: "destructive",
        title: "Signup failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" disabled={isLoading} autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@outlive.com"
                    type="email"
                    disabled={isLoading}
                    autoComplete="email"
                    {...field}
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
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234567890"
                    type="tel"
                    disabled={isLoading}
                    autoComplete="tel"
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
                    placeholder="••••••••"
                    type="password"
                    disabled={isLoading}
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    I agree to the{" "}
                    <a href="/terms" className="font-medium text-outlive-teal-600 hover:text-outlive-teal-500">
                      terms of service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="font-medium text-outlive-teal-600 hover:text-outlive-teal-500">
                      privacy policy
                    </a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-green-800 hover:bg-green-900 text-white/90" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
