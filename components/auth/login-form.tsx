"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "../ui/use-toast"
import { useMutation } from "@tanstack/react-query"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  rememberMe: z.boolean().optional(), // added rememberMe here
});

type LoginFormValues = z.infer<typeof loginSchema>;

const login = async (data: { email: string; password: string }) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error(errorData.message || "Login failed");
    }

    return response.json();
  } catch (error) {
    console.error("Error in login function:", error);
    throw new Error("Login failed");
  }
}

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false, // default false
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => login(data),
    onSuccess: (data) => {
      toast({
        description: "Login successful!",
      });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An error occurred",
      });
    },
  });

  const handleSubmit = (data: LoginFormValues) => {
    try {
      console.log("Form data:", data);
      loginMutation.mutate({ email: data.email, password: data.password });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
      });
    }
  };


  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@outlive.com"
                    type="email"
                    autoComplete="email"
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-medium text-premium-primary hover:text-premium-secondary"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-gray-300 dark:border-gray-600"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal text-gray-600 dark:text-gray-400">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-premium-primary hover:bg-premium-secondary text-white"

          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
