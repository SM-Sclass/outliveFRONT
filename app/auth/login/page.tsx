import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "Login - Outlive",
  description: "Login to your Outlive account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 dark:bg-gray-900">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-center md:flex-row">
        {/* Left side - Brand section */}
        <div className="hidden w-full items-center justify-center bg-premium-primary px-8 py-12 text-white md:flex md:w-1/2 md:flex-col md:items-start lg:px-16">
          <div className="space-y-6 max-w-lg mx-auto md:mx-0">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-white p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-premium-primary"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Outlive</h1>
            </div>

            <h2 className="text-3xl font-bold leading-tight lg:text-4xl">Welcome back to Outlive</h2>
            <p className="text-lg opacity-90">
              Your journey to a healthier lifestyle starts here. Login to access personalized health consultations,
              wellness programs, and expert support.
            </p>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-white/20 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <p>24/7 access to health experts</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-white/20 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                </div>
                <p>Personalized wellness programs</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-white/20 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <p>Community support and guidance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex w-full items-center justify-center px-4 md:w-1/2 md:px-0 lg:px-8 xl:px-20">
          <div className="mx-auto w-full max-w-md space-y-6 py-12">
            {/* Mobile logo */}
            <div className="flex flex-col space-y-2 text-center md:hidden">
              <div className="mx-auto rounded-full bg-premium-primary p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Outlive</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your journey to a healthier lifestyle starts here
              </p>
            </div>

            {/* Login form container */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Login to your account</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Enter your email and password to access your account
                </p>
              </div>

              <LoginForm />

              <div className="text-center text-sm mt-6 text-gray-600 dark:text-gray-300">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="font-medium text-premium-primary hover:text-premium-secondary">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}