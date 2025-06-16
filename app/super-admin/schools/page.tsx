"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Plus, Users, MapPin, Phone, Mail, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { LogoutButton } from "@/components/auth/logout-button"

// Add imports for server actions
import { getSchools, deleteSchool } from "@/lib/school-actions"

interface SchoolType {
  id: number
  name: string
  type: string
  code: string
  address: string
  phone: string
  email: string
  adminName: string
  studentCount: number
  teacherCount: number
  status: "active" | "inactive" | "pending"
  createdAt: string
}

const mockSchools: SchoolType[] = [
  {
    id: 1,
    name: "Greenfield Primary School",
    type: "Primary School",
    code: "GPS001",
    address: "Nairobi, Kenya",
    phone: "+254 712 345 678",
    email: "info@greenfield.ac.ke",
    adminName: "John Doe",
    studentCount: 1234,
    teacherCount: 89,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Sunrise Secondary School",
    type: "Secondary School",
    code: "SSS002",
    address: "Mombasa, Kenya",
    phone: "+254 723 456 789",
    email: "admin@sunrise.ac.ke",
    adminName: "Mary Wanjiku",
    studentCount: 856,
    teacherCount: 67,
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "Tech Valley Institute",
    type: "Technical Institute",
    code: "TVI003",
    address: "Kisumu, Kenya",
    phone: "+254 734 567 890",
    email: "info@techvalley.ac.ke",
    adminName: "Peter Kimani",
    studentCount: 445,
    teacherCount: 34,
    status: "pending",
    createdAt: "2024-01-20",
  },
]

export default function SchoolsPage() {
  const [schools, setSchools] = useState<SchoolType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Replace the useEffect with server action call
  useEffect(() => {
    const loadSchools = async () => {
      setIsLoading(true)
      try {
        const schoolsData = await getSchools()
        setSchools(schoolsData)
      } catch (error) {
        console.error("Failed to load schools:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSchools()
  }, [])

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.adminName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Add delete handler
  const handleDeleteSchool = async (schoolId: number, schoolName: string) => {
    if (confirm(`Are you sure you want to delete ${schoolName}? This action cannot be undone.`)) {
      const result = await deleteSchool(schoolId)
      if (result.success) {
        setSchools(schools.filter((school) => school.id !== schoolId))
        alert(result.message)
      } else {
        alert(result.message)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading schools...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/super-admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Manage Schools</h1>
                <p className="text-sm text-gray-600">{schools.length} schools registered</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Link href="/super-admin/schools/create">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New School
            </Button>
          </Link>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <Card key={school.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg mb-1">{school.name}</CardTitle>
                    <p className="text-sm text-gray-600">{school.type}</p>
                  </div>
                  <Badge className={getStatusColor(school.status)}>{school.status}</Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">{school.code}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{school.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{school.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{school.email}</span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{school.studentCount}</div>
                      <div className="text-gray-500">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{school.teacherCount}</div>
                      <div className="text-gray-500">Teachers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-600">{school.adminName}</div>
                      <div className="text-gray-500">Admin</div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteSchool(school.id, school.name)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schools found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first school"}
            </p>
            <Link href="/super-admin/schools/create">
              <Button>Add New School</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
