"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Plus, Users, UserCheck, GraduationCap, User, Heart } from "lucide-react"
import Link from "next/link"
import { LogoutButton } from "@/components/auth/logout-button"

// Add imports for server actions
import { getSchoolUsers, deleteUser } from "@/lib/user-actions"
import { getSession } from "@/lib/auth"

interface SchoolUser {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  role: "teacher" | "student" | "parent"
  status: "active" | "inactive" | "pending"
  joinedAt: string
  additionalInfo?: {
    employeeNumber?: string
    admissionNumber?: string
    class?: string
    subjects?: string[]
    children?: string[]
  }
}

const mockUsers: SchoolUser[] = [
  {
    id: 1,
    firstName: "Mary",
    lastName: "Wanjiku",
    email: "mary.teacher@greenfield.ac.ke",
    phone: "+254 701 234 567",
    role: "teacher",
    status: "active",
    joinedAt: "2024-01-15",
    additionalInfo: {
      employeeNumber: "T001",
      subjects: ["Mathematics", "Science"],
    },
  },
  {
    id: 2,
    firstName: "Alice",
    lastName: "Muthoni",
    email: "alice.student@greenfield.ac.ke",
    phone: "+254 702 345 678",
    role: "student",
    status: "active",
    joinedAt: "2024-01-20",
    additionalInfo: {
      admissionNumber: "GPS001/2024/001",
      class: "Grade 5A",
    },
  },
  {
    id: 3,
    firstName: "Jane",
    lastName: "Muthoni",
    email: "jane.parent@gmail.com",
    phone: "+254 703 456 789",
    role: "parent",
    status: "active",
    joinedAt: "2024-01-20",
    additionalInfo: {
      children: ["Alice Muthoni"],
    },
  },
  {
    id: 4,
    firstName: "Peter",
    lastName: "Kimani",
    email: "peter.teacher@greenfield.ac.ke",
    phone: "+254 704 567 890",
    role: "teacher",
    status: "pending",
    joinedAt: "2024-01-25",
    additionalInfo: {
      employeeNumber: "T002",
      subjects: ["English", "Kiswahili"],
    },
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<SchoolUser[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Replace the useEffect with server action call
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true)
      try {
        // Get current user's school ID
        const currentUser = await getSession()
        if (currentUser?.schoolId) {
          const usersData = await getSchoolUsers(currentUser.schoolId)
          setUsers(usersData)
        }
      } catch (error) {
        console.error("Failed to load users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab = activeTab === "all" || user.role === activeTab

    return matchesSearch && matchesTab
  })

  const getUsersByRole = (role: string) => {
    return users.filter((user) => user.role === role).length
  }

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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "teacher":
        return <UserCheck className="w-4 h-4" />
      case "student":
        return <GraduationCap className="w-4 h-4" />
      case "parent":
        return <Heart className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  // Add delete handler
  const handleDeleteUser = async (userId: number, userName: string) => {
    if (confirm(`Are you sure you want to remove ${userName}? This action cannot be undone.`)) {
      const result = await deleteUser(userId)
      if (result.success) {
        setUsers(users.filter((user) => user.id !== userId))
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
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading users...</p>
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
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">User Management</h1>
                <p className="text-sm text-gray-600">Greenfield Primary School</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teachers</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getUsersByRole("teacher")}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getUsersByRole("student")}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parents</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getUsersByRole("parent")}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Link href="/admin/users/create">
              <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </Link>
            <Link href="/admin/users/bulk-import">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Bulk Import
              </Button>
            </Link>
          </div>
        </div>

        {/* User Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="teacher">Teachers</TabsTrigger>
            <TabsTrigger value="student">Students</TabsTrigger>
            <TabsTrigger value="parent">Parents</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                          {getRoleIcon(user.role)}
                          <span className="sr-only">{user.role}</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {user.firstName} {user.lastName}
                          </CardTitle>
                          <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-600">{user.phone}</p>
                    </div>

                    {user.additionalInfo && (
                      <div className="border-t pt-3 space-y-1">
                        {user.additionalInfo.employeeNumber && (
                          <p className="text-sm">
                            <span className="font-medium">Employee #:</span> {user.additionalInfo.employeeNumber}
                          </p>
                        )}
                        {user.additionalInfo.admissionNumber && (
                          <p className="text-sm">
                            <span className="font-medium">Admission #:</span> {user.additionalInfo.admissionNumber}
                          </p>
                        )}
                        {user.additionalInfo.class && (
                          <p className="text-sm">
                            <span className="font-medium">Class:</span> {user.additionalInfo.class}
                          </p>
                        )}
                        {user.additionalInfo.subjects && (
                          <p className="text-sm">
                            <span className="font-medium">Subjects:</span> {user.additionalInfo.subjects.join(", ")}
                          </p>
                        )}
                        {user.additionalInfo.children && (
                          <p className="text-sm">
                            <span className="font-medium">Children:</span> {user.additionalInfo.children.join(", ")}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteUser(user.id, `${user.firstName} ${user.lastName}`)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first user"}
                </p>
                <Link href="/admin/users/create">
                  <Button>Add New User</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
