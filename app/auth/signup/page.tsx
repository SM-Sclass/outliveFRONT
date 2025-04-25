import type { Metadata } from "next"
import Link from "next/link"
import { SignupForm } from "@/components/auth/signup-form"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "Sign Up - Early",
  description: "Create a new Outlive account",
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-center md:flex-row">
        <div className="hidden w-full items-center justify-center bg-gradient-to-r from-outlive-green-700 to-outlive-teal-600 px-8 text-white md:flex md:w-1/2 md:flex-col md:items-center lg:px-16">
          <div className="space-y-8 max-w-lg mx-auto md:mx-0">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-black p-1 dark:bg-white">
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
                  className="text-outlive-green-600"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-black dark:text-white">Outlive</h1>
            </div>

            <h2 className="text-3xl font-bold leading-tight lg:text-4xl text-black dark:text-white">Start your health journey with Outlive</h2>
            <p className="text-lg  leading-relaxed text-black dark:text-white/90">
              Join Outlive today and take the first step toward a healthier, more balanced lifestyle with personalized
              guidance from our experts.
            </p>

            <div className="flex flex-col space-y-4 mt-2">
              <div className="flex items-center space-x-3">
                <div className="rounded-full text-black dark:text-white/90 p-1.5">
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
                    className=""
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <p className="text-black dark:text-white/90">Personalized health assessment</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-full text-black dark:text-white/90 p-1.5">
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
                    className=""
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                </div>
                <p className="text-black dark:text-white/90">Book consultations with experts</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-full text-black dark:text-white/90 p-1.5">
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
                    className=""
                  >
                    <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"></path>
                    <circle cx="17" cy="7" r="5"></circle>
                  </svg>
                </div>
                <p className="text-black dark:text-white/90">Access to premium wellness content</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center px-4 md:w-1/2 md:px-0 lg:px-8 xl:px-20">
          <div className="mx-auto w-full max-w-md space-y-6  pb-12 bg-white dark:bg-premium-tealDark p-6 rounded-lg shadow-md">
            <div className="flex flex-col space-y-2 text-center md:hidden">
              <div className="mx-auto rounded-full bg-outlive-green-600 p-2">
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
              <h1 className="text-2xl font-bold text-black dark:text-white/90">Outlive</h1>
              <p className="text-sm text-muted-foreground text-black dark:text-white/90">Your journey to a healthier lifestyle starts here</p>
            </div>

            <div className="flex flex-col space-y-2 ">
              <h2 className="text-2xl font-bold">Create your account</h2>
              <p className="text-sm text-muted-foreground">Enter your information to create an Outlive account</p>
            </div>

            <SignupForm />

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-outlive-teal-600 hover:text-outlive-teal-500 ">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
