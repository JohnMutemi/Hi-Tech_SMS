"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, School, User, Mail, LinkIcon, Copy, CheckCircle, Eye, EyeOff, X } from "lucide-react"
import { generateSchoolCode, generatePortalUrl } from "@/lib/utils/school-generator"

interface SchoolCreationResult {
  school: {
    name: string
    schoolCode: string
    portalUrl: string
    colorTheme: string
    logoUrl?: string
  }
  admin: {
    firstName: string
    lastName: string
    email: string
    password: string
  }
}

export function AddSchoolForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdSchool, setCreatedSchool] = useState<SchoolCreationResult | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    logo: null as File | null,
    colorTheme: "#3B82F6",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    description: "",
  })

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size
      if (file.size > 500000) {
        // 500KB limit
        alert("Logo file is too large. Please use an image smaller than 500KB.")
        return
      }

      setFormData({ ...formData, logo: file })

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setFormData({ ...formData, logo: null })
    setLogoPreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Form submitted with data:", formData)

    // Add validation
    if (!formData.name || !formData.adminFirstName || !formData.adminLastName || !formData.adminEmail) {
      alert("Please fill in all required fields (School Name, Admin First Name, Admin Last Name, and Admin Email)")
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.adminEmail)) {
      alert("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      console.log("Creating school via API...")

      const response = await fetch("/api/schools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          colorTheme: formData.colorTheme,
          adminFirstName: formData.adminFirstName,
          adminLastName: formData.adminLastName,
          adminEmail: formData.adminEmail,
          description: formData.description,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create school")
      }

      const result = await response.json()
      console.log("School creation result:", result)

      // Set the created school state to show the success popup
      setCreatedSchool(result)

      // Show success message
      console.log("SUCCESS: School created and popup should show")
    } catch (error) {
      console.error("Error creating school:", error)
      alert(`Failed to create school: ${error.message || "Unknown error"}. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const resetForm = () => {
    setCreatedSchool(null)
    setLogoPreview(null)
    setFormData({
      name: "",
      logo: null,
      colorTheme: "#3B82F6",
      adminFirstName: "",
      adminLastName: "",
      adminEmail: "",
      description: "",
    })
  }

  if (createdSchool) {
    console.log("Showing success popup for:", createdSchool.school.name)
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700">School Created Successfully!</CardTitle>
          <CardDescription>
            {createdSchool.school.name} has been added to the platform with a unique portal and admin account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* School Information */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <School className="w-5 h-5 mr-2 text-blue-600" />
              School Information
            </h3>

            {/* School Logo and Name Display */}
            <div className="flex items-center space-x-4 mb-6 p-4 bg-white rounded-lg border">
              <div className="flex items-center space-x-3">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center border-2"
                  style={{
                    backgroundColor: createdSchool.school.colorTheme + "20",
                    borderColor: createdSchool.school.colorTheme,
                  }}
                >
                  <School className="w-8 h-8" style={{ color: createdSchool.school.colorTheme }} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{createdSchool.school.name}</h4>
                  <p className="text-sm text-gray-600 font-mono">Code: {createdSchool.school.schoolCode}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">School Code</Label>
                <div className="flex items-center justify-between bg-white p-3 rounded border mt-1">
                  <span className="font-mono font-bold">{createdSchool.school.schoolCode}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(createdSchool.school.schoolCode, "schoolCode")}
                  >
                    {copiedField === "schoolCode" ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Theme Color</Label>
                <div className="flex items-center space-x-3 mt-1">
                  <div
                    className="w-8 h-8 rounded border-2 border-gray-300"
                    style={{ backgroundColor: createdSchool.school.colorTheme }}
                  ></div>
                  <span className="font-mono">{createdSchool.school.colorTheme}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Label className="text-sm font-medium text-gray-600">Portal URL</Label>
              <div className="flex items-center justify-between bg-white p-3 rounded border mt-1">
                <span className="text-blue-600 underline font-medium">{createdSchool.school.portalUrl}</span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(createdSchool.school.portalUrl, "portalUrl")}
                  >
                    {copiedField === "portalUrl" ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(createdSchool.school.portalUrl, "_blank")}
                  >
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Credentials */}
          <div className="bg-amber-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-amber-600" />
              School Admin Credentials
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Admin Name</Label>
                <div className="bg-white p-3 rounded border mt-1">
                  <span>
                    {createdSchool.admin.firstName} {createdSchool.admin.lastName}
                  </span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Email Address</Label>
                <div className="flex items-center justify-between bg-white p-3 rounded border mt-1">
                  <span>{createdSchool.admin.email}</span>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(createdSchool.admin.email, "email")}>
                    {copiedField === "email" ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Label className="text-sm font-medium text-gray-600">Temporary Password</Label>
              <div className="flex items-center justify-between bg-white p-3 rounded border mt-1">
                <span className="font-mono">{showPassword ? createdSchool.admin.password : "••••••••••••"}</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(createdSchool.admin.password, "password")}
                  >
                    {copiedField === "password" ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-700">Next Steps</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                School portal has been created and is accessible
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Admin credentials have been generated
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-green-500 mr-2" />
                Send the portal URL and credentials to the school administrator
              </li>
              <li className="flex items-center">
                <User className="w-4 h-4 text-green-500 mr-2" />
                Admin will complete the school setup on first login
              </li>
            </ul>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => window.open(createdSchool.school.portalUrl, "_blank")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Visit School Portal
            </Button>
            <Button onClick={resetForm} variant="outline">
              Add Another School
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <School className="w-6 h-6 mr-2 text-blue-600" />
          Add New School
        </CardTitle>
        <CardDescription>Create a new school portal with admin credentials and unique branding.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* School Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">School Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schoolName">School Name *</Label>
                <Input
                  id="schoolName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter school name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="colorTheme">Brand Color *</Label>
                <div className="flex items-center space-x-3">
                  <Input
                    id="colorTheme"
                    type="color"
                    value={formData.colorTheme}
                    onChange={(e) => setFormData({ ...formData, colorTheme: e.target.value })}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={formData.colorTheme}
                    onChange={(e) => setFormData({ ...formData, colorTheme: e.target.value })}
                    placeholder="#3B82F6"
                    className="font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">School Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the school..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">School Logo (Optional - Max 500KB)</Label>
              {logoPreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo preview"
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{formData.logo?.name}</p>
                        <p className="text-xs text-gray-500">
                          {formData.logo && (formData.logo.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={removeLogo}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 500KB</p>
                  <Input id="logo" type="file" accept="image/*" onChange={handleLogoChange} className="mt-2" />
                </div>
              )}
            </div>
          </div>

          {/* Admin Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">School Administrator</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adminFirstName">First Name *</Label>
                <Input
                  id="adminFirstName"
                  value={formData.adminFirstName}
                  onChange={(e) => setFormData({ ...formData, adminFirstName: e.target.value })}
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminLastName">Last Name *</Label>
                <Input
                  id="adminLastName"
                  value={formData.adminLastName}
                  onChange={(e) => setFormData({ ...formData, adminLastName: e.target.value })}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email Address *</Label>
              <Input
                id="adminEmail"
                type="email"
                value={formData.adminEmail}
                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                placeholder="admin@school.edu"
                required
              />
            </div>
          </div>

          {/* Preview */}
          {formData.name && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Preview</h4>
              <div className="flex items-center space-x-4 mb-3">
                {logoPreview ? (
                  <img
                    src={logoPreview || "/placeholder.svg"}
                    alt="Logo preview"
                    className="w-12 h-12 object-cover rounded-lg border-2"
                    style={{ borderColor: formData.colorTheme }}
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center border-2"
                    style={{
                      backgroundColor: formData.colorTheme + "20",
                      borderColor: formData.colorTheme,
                    }}
                  >
                    <School className="w-6 h-6" style={{ color: formData.colorTheme }} />
                  </div>
                )}
                <div>
                  <h5 className="font-semibold text-gray-900">{formData.name}</h5>
                  <p className="text-sm text-gray-600 font-mono">Code: {generateSchoolCode(formData.name)}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Portal URL:</strong>{" "}
                  {generatePortalUrl(window.location.origin, generateSchoolCode(formData.name))}
                </p>
                <p>
                  <strong>Admin:</strong> {formData.adminFirstName} {formData.adminLastName}
                </p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating School Portal...
              </>
            ) : (
              "Create School Portal"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
