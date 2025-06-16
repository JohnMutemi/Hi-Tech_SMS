"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, User, GraduationCap, UserCheck, Heart, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { LogoutButton } from "@/components/auth/logout-button"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Add imports for server actions
import { createUser } from "@/lib/user-actions"
import { useActionState } from "react"

export default function CreateUserPage() {
  const router = useRouter()

  // Replace the form submission logic
  const [state, action, isPending] = useActionState(createUser, undefined)
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    // Teacher specific
    employeeNumber: "",
    subjects: [] as string[],
    qualification: "",
    // Student specific
    admissionNumber: "",
    class: "",
    dateOfBirth: "",
    parentEmail: "",
    // Parent specific
    occupation: "",
    address: "",
    emergencyContact: "",
  })

  const availableSubjects = [
    "Mathematics",
    "English",
    "Kiswahili",
    "Science",
    "Social Studies",
    "Religious Education",
    "Physical Education",
    "Art & Craft",
    "Music",
    "Computer Studies",
  ]

  const availableClasses = [
    "Grade 1A",
    "Grade 1B",
    "Grade 2A",
    "Grade 2B",
    "Grade 3A",
    "Grade 3B",
    "Grade 4A",
    "Grade 4B",
    "Grade 5A",
    "Grade 5B",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      subjects: checked ? [...prev.subjects, subject] : prev.subjects.filter((s) => s !== subject),
    }))
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "teacher":
        return <UserCheck className="w-5 h-5" />
      case "student":
        return <GraduationCap className="w-5 h-5" />
      case "parent":
        return <Heart className="w-5 h-5" />
      default:
        return <User className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/users">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Add New User</h1>
                <p className="text-sm text-gray-600">Create a new account for your school</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Add success/error message display after the header */}
      {state?.success && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {state.message}
            {state.tempPassword && (
              <div className="mt-2 p-2 bg-green-100 rounded text-sm">
                <strong>Temporary Password:</strong> {state.tempPassword}
                <br />
                <em>Please share this securely with the user.</em>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {state?.errors?.general && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{state.errors.general[0]}</AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Update the form to use server action */}
        <form action={action} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  {/* Update all input fields to include error states and names */}
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter first name"
                    required
                    className={state?.errors?.firstName ? "border-red-500" : ""}
                  />
                  {state?.errors?.firstName && <p className="text-sm text-red-500">{state.errors.firstName[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter last name"
                    required
                    className={state?.errors?.lastName ? "border-red-500" : ""}
                  />
                  {state?.errors?.lastName && <p className="text-sm text-red-500">{state.errors.lastName[0]}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@example.com"
                    required
                    className={state?.errors?.email ? "border-red-500" : ""}
                  />
                  {state?.errors?.email && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
                </div>
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
                  <Label htmlFor="role">Role *</Label>
                  {/* Update the role select */}
                  <Select name="role" value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role-specific Information */}
          {selectedRole && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getRoleIcon(selectedRole)}
                  <span>{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedRole === "teacher" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="employeeNumber">Employee Number *</Label>
                        <Input
                          id="employeeNumber"
                          name="employeeNumber"
                          placeholder="T001"
                          required
                          className={state?.errors?.employeeNumber ? "border-red-500" : ""}
                        />
                        {state?.errors?.employeeNumber && (
                          <p className="text-sm text-red-500">{state.errors.employeeNumber[0]}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="qualification">Qualification</Label>
                        <Input
                          id="qualification"
                          name="qualification"
                          placeholder="Bachelor of Education"
                          className={state?.errors?.qualification ? "border-red-500" : ""}
                        />
                        {state?.errors?.qualification && (
                          <p className="text-sm text-red-500">{state.errors.qualification[0]}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Subjects *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {availableSubjects.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            {/* Update subject checkboxes to use proper names */}
                            <Checkbox
                              id={subject.replace(/\s+/g, "_")}
                              name={`subject_${subject.replace(/\s+/g, "_")}`}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedSubjects([...selectedSubjects, subject])
                                } else {
                                  setSelectedSubjects(selectedSubjects.filter((s) => s !== subject))
                                }
                              }}
                            />
                            <Label htmlFor={subject.replace(/\s+/g, "_")} className="text-sm">
                              {subject}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {selectedRole === "student" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="admissionNumber">Admission Number *</Label>
                        <Input
                          id="admissionNumber"
                          name="admissionNumber"
                          placeholder="GPS001/2024/001"
                          required
                          className={state?.errors?.admissionNumber ? "border-red-500" : ""}
                        />
                        {state?.errors?.admissionNumber && (
                          <p className="text-sm text-red-500">{state.errors.admissionNumber[0]}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="class">Class *</Label>
                        <Select
                          name="class"
                          value={formData.class}
                          onValueChange={(value) => handleInputChange("class", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableClasses.map((cls) => (
                              <SelectItem key={cls} value={cls}>
                                {cls}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          className={state?.errors?.dateOfBirth ? "border-red-500" : ""}
                        />
                        {state?.errors?.dateOfBirth && (
                          <p className="text-sm text-red-500">{state.errors.dateOfBirth[0]}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentEmail">Parent Email</Label>
                      <Input
                        id="parentEmail"
                        name="parentEmail"
                        type="email"
                        placeholder="parent@example.com"
                        className={state?.errors?.parentEmail ? "border-red-500" : ""}
                      />
                      {state?.errors?.parentEmail && (
                        <p className="text-sm text-red-500">{state.errors.parentEmail[0]}</p>
                      )}
                    </div>
                  </>
                )}

                {selectedRole === "parent" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input
                          id="occupation"
                          name="occupation"
                          placeholder="Enter occupation"
                          className={state?.errors?.occupation ? "border-red-500" : ""}
                        />
                        {state?.errors?.occupation && (
                          <p className="text-sm text-red-500">{state.errors.occupation[0]}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input
                          id="emergencyContact"
                          name="emergencyContact"
                          placeholder="+254 xxx xxx xxx"
                          className={state?.errors?.emergencyContact ? "border-red-500" : ""}
                        />
                        {state?.errors?.emergencyContact && (
                          <p className="text-sm text-red-500">{state.errors.emergencyContact[0]}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        placeholder="Enter complete address"
                        className={state?.errors?.address ? "border-red-500" : ""}
                      />
                      {state?.errors?.address && <p className="text-sm text-red-500">{state.errors.address[0]}</p>}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> A temporary password will be generated and sent to the user's email address.
                  They will be required to change it on first login.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/admin/users">
              <Button variant="outline">Cancel</Button>
            </Link>
            {/* Update submit button */}
            <Button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            >
              {isPending ? "Creating User..." : "Create User"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
