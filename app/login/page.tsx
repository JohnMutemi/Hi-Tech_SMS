"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { GraduationCap, Eye, EyeOff } from "lucide-react"
import { login } from "@/lib/auth-actions"
import { useState } from "react"

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">EduManage</span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </CardHeader>
          <CardContent>
            <form action={action} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className={state?.errors?.email ? "border-red-500" : ""}
                />
                {state?.errors?.email && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className={state?.errors?.password ? "border-red-500 pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {state?.errors?.password && <p className="text-sm text-red-500">{state.errors.password[0]}</p>}
              </div>

              {/* School Code */}
              <div className="space-y-2">
                <Label htmlFor="schoolCode">School Code (Optional for Super Admin)</Label>
                <Input
                  id="schoolCode"
                  name="schoolCode"
                  type="text"
                  placeholder="Enter school code (e.g., GPS001)"
                  className={state?.errors?.schoolCode ? "border-red-500" : ""}
                />
                {state?.errors?.schoolCode && <p className="text-sm text-red-500">{state.errors.schoolCode[0]}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                disabled={isPending}
              >
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Demo Accounts:</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <div>
                  <strong>Super Admin:</strong> superadmin@edumanage.co.ke / super123
                </div>
                <div>
                  <strong>School Admin:</strong> admin@greenfield.ac.ke / admin123 (GPS001)
                </div>
                <div>
                  <strong>Teacher:</strong> teacher@greenfield.ac.ke / teacher123 (GPS001)
                </div>
                <div>
                  <strong>Student:</strong> student@greenfield.ac.ke / student123 (GPS001)
                </div>
                <div>
                  <strong>Parent:</strong> parent@gmail.com / parent123 (GPS001)
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="mt-6 text-center space-y-2">
              <Link href="/forgot-password" className="text-sm text-red-500 hover:text-red-600">
                Forgot your password?
              </Link>
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-red-500 hover:text-red-600 font-medium">
                  Sign up
                </Link>
              </div>
              <div className="text-sm text-gray-600">
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  ← Back to home
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
