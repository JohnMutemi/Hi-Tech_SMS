"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Eye, EyeOff } from "lucide-react"
import { signup } from "@/lib/auth-actions"
import { useState } from "react"

export default function SignupPage() {
  const [state, action, isPending] = useActionState(signup, undefined)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")

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
            <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
            <p className="text-gray-600">Join your school's digital ecosystem</p>
          </CardHeader>
          <CardContent>
            <form action={action} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    required
                    className={state?.errors?.firstName ? "border-red-500" : ""}
                  />
                  {state?.errors?.firstName && <p className="text-sm text-red-500">{state.errors.firstName[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    required
                    className={state?.errors?.lastName ? "border-red-500" : ""}
                  />
                  {state?.errors?.lastName && <p className="text-sm text-red-500">{state.errors.lastName[0]}</p>}
                </div>
              </div>

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

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className={state?.errors?.role ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">School Administrator</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                  </SelectContent>
                </Select>
                {state?.errors?.role && <p className="text-sm text-red-500">{state.errors.role[0]}</p>}
              </div>

              {/* School Code */}
              <div className="space-y-2">
                <Label htmlFor="schoolCode">School Code</Label>
                <Input
                  id="schoolCode"
                  name="schoolCode"
                  type="text"
                  placeholder="Enter school code (e.g., GPS001)"
                  required
                  className={state?.errors?.schoolCode ? "border-red-500" : ""}
                />
                {state?.errors?.schoolCode && <p className="text-sm text-red-500">{state.errors.schoolCode[0]}</p>}
                <p className="text-xs text-gray-500">Contact your school administrator for the school code</p>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    className={state?.errors?.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {state?.errors?.confirmPassword && (
                  <p className="text-sm text-red-500">{state.errors.confirmPassword[0]}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                disabled={isPending}
              >
                {isPending ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            {/* Links */}
            <div className="mt-6 text-center space-y-2">
              <div className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-red-500 hover:text-red-600 font-medium">
                  Sign in
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
