"use client"

import { useState } from "react"
import { useActionState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, School, User, CheckCircle, AlertCircle, Mail, Copy } from "lucide-react"
import Link from "next/link"
import { LogoutButton } from "@/components/auth/logout-button"
import { createSchool } from "@/lib/school-actions"

export default function CreateSchoolPage() {
  const [state, action, isPending] = useActionState(createSchool, undefined)
  const [selectedType, setSelectedType] = useState("")
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/super-admin/schools">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Add New School</h1>
                <p className="text-sm text-gray-600">Register a new educational institution</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {state?.success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{state.message}</span>
                </div>

                {state.tempPassword && state.schoolCode && (
                  <div className="mt-4 p-4 bg-green-100 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-3">📧 Email Sent Successfully!</h4>
                    <p className="text-sm text-green-800 mb-3">
                      A welcome email with login instructions has been sent to <strong>{state.adminEmail}</strong>
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between bg-white p-2 rounded border">
                        <span className="font-medium">School Code:</span>
                        <div className="flex items-center space-x-2">
                          <code className="bg-gray-100 px-2 py-1 rounded">{state.schoolCode}</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(state.schoolCode, "schoolCode")}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          {copiedField === "schoolCode" && <span className="text-xs text-green-600">Copied!</span>}
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-white p-2 rounded border">
                        <span className="font-medium">Temp Password:</span>
                        <div className="flex items-center space-x-2">
                          <code className="bg-gray-100 px-2 py-1 rounded">{state.tempPassword}</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(state.tempPassword, "tempPassword")}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          {copiedField === "tempPassword" && <span className="text-xs text-green-600">Copied!</span>}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-800">
                      💡 <strong>Tip:</strong> The admin can also find these credentials in their email. They'll be
                      prompted to change the password on first login.
                    </div>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {state?.errors?.general && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{state.errors.general[0]}</AlertDescription>
          </Alert>
        )}

        <form action={action} className="space-y-8">
          {/* School Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <School className="w-5 h-5" />
                <span>School Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name *</Label>
                  <Input
                    id="schoolName"
                    name="schoolName"
                    placeholder="Enter school name"
                    required
                    className={state?.errors?.schoolName ? "border-red-500" : ""}
                  />
                  {state?.errors?.schoolName && <p className="text-sm text-red-500">{state.errors.schoolName[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolType">School Type *</Label>
                  <Select name="schoolType" value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className={state?.errors?.schoolType ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select school type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary School</SelectItem>
                      <SelectItem value="secondary">Secondary School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="technical">Technical Institute</SelectItem>
                    </SelectContent>
                  </Select>
                  {state?.errors?.schoolType && <p className="text-sm text-red-500">{state.errors.schoolType[0]}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter complete school address"
                  required
                  className={state?.errors?.address ? "border-red-500" : ""}
                />
                {state?.errors?.address && <p className="text-sm text-red-500">{state.errors.address[0]}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+254 xxx xxx xxx"
                    required
                    className={state?.errors?.phone ? "border-red-500" : ""}
                  />
                  {state?.errors?.phone && <p className="text-sm text-red-500">{state.errors.phone[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="school@example.com"
                    required
                    className={state?.errors?.email ? "border-red-500" : ""}
                  />
                  {state?.errors?.email && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input id="website" name="website" placeholder="https://school.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Brief description of the school" />
              </div>
            </CardContent>
          </Card>

          {/* School Administrator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>School Administrator</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="adminFirstName">First Name *</Label>
                  <Input
                    id="adminFirstName"
                    name="adminFirstName"
                    placeholder="Administrator's first name"
                    required
                    className={state?.errors?.adminFirstName ? "border-red-500" : ""}
                  />
                  {state?.errors?.adminFirstName && (
                    <p className="text-sm text-red-500">{state.errors.adminFirstName[0]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminLastName">Last Name *</Label>
                  <Input
                    id="adminLastName"
                    name="adminLastName"
                    placeholder="Administrator's last name"
                    required
                    className={state?.errors?.adminLastName ? "border-red-500" : ""}
                  />
                  {state?.errors?.adminLastName && (
                    <p className="text-sm text-red-500">{state.errors.adminLastName[0]}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email Address *</Label>
                  <Input
                    id="adminEmail"
                    name="adminEmail"
                    type="email"
                    placeholder="admin@school.com"
                    required
                    className={state?.errors?.adminEmail ? "border-red-500" : ""}
                  />
                  {state?.errors?.adminEmail && <p className="text-sm text-red-500">{state.errors.adminEmail[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPhone">Phone Number *</Label>
                  <Input
                    id="adminPhone"
                    name="adminPhone"
                    placeholder="+254 xxx xxx xxx"
                    required
                    className={state?.errors?.adminPhone ? "border-red-500" : ""}
                  />
                  {state?.errors?.adminPhone && <p className="text-sm text-red-500">{state.errors.adminPhone[0]}</p>}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>📧 Automated Email Delivery:</strong>
                  <br />• Welcome email with login credentials will be sent automatically
                  <br />• Email includes school code, temporary password, and login instructions
                  <br />• Admin will be prompted to change password on first login
                  <br />• Credentials will also be displayed here for your immediate reference
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/super-admin/schools">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              {isPending ? "Creating School..." : "Create School & Send Credentials"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
