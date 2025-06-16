"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, UserCheck, Heart, Plus, Settings, BookOpen } from "lucide-react"
import Link from "next/link"
import { LogoutButton } from "@/components/auth/logout-button"
import { useAuth } from "@/contexts/auth-context"
import { getSchoolUsers } from "@/lib/user-actions"

interface DashboardStats {
  totalUsers: number
  teachers: number
  students: number
  parents: number
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    teachers: 0,
    students: 0,
    parents: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      if (user?.schoolId) {
        try {
          const users = await getSchoolUsers(user.schoolId)
          const teachers = users.filter((u) => u.role === "teacher").length
          const students = users.filter((u) => u.role === "student").length
          const parents = users.filter((u) => u.role === "parent").length

          setStats({
            totalUsers: users.length,
            teachers,
            students,
            parents,
          })
        } catch (error) {
          console.error("Failed to fetch stats:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchStats()
  }, [user])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">School Dashboard</h1>
              <p className="text-sm text-gray-600">{user.schoolName}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message for New Admins */}
        {stats.totalUsers === 0 && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Welcome to Your School Dashboard!</h3>
                <p className="text-blue-800 mb-4">
                  Your school has been successfully set up. You can now start adding teachers, students, and parents to
                  your school management system.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/admin/users/create">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add First User
                    </Button>
                  </Link>
                  <Link href="/admin/settings">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      School Settings
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">All registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teachers</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : stats.teachers}</div>
              <p className="text-xs text-muted-foreground">Teaching staff</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : stats.students}</div>
              <p className="text-xs text-muted-foreground">Enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parents</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : stats.parents}</div>
              <p className="text-xs text-muted-foreground">Parent accounts</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/users/create" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New User
                </Button>
              </Link>
              <Link href="/admin/users" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin/classes" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Manage Classes
                </Button>
              </Link>
              <Link href="/admin/settings" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  School Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-green-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Add Teachers</p>
                    <p className="text-xs text-gray-600">Start by adding your teaching staff</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Create Classes</p>
                    <p className="text-xs text-gray-600">Set up your class structure</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-purple-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Enroll Students</p>
                    <p className="text-xs text-gray-600">Add students to their respective classes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-orange-600">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Add Parents</p>
                    <p className="text-xs text-gray-600">Connect parents to their children</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.totalUsers === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No activity yet. Start by adding your first user!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Recent user additions and updates will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
