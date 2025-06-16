"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { School, Users, TrendingUp, Plus, Settings, BarChart3, LogOut, GraduationCap, Eye } from "lucide-react"
import Link from "next/link"
import { getAllSchools } from "@/lib/school-storage"

export function SuperAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [allSchools, setAllSchools] = useState<any[]>([])

  const refreshSchools = () => {
    const schools = getAllSchools()
    setAllSchools(schools)
  }

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem("superadmin-auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      // Load schools from localStorage
      const schools = getAllSchools()
      setAllSchools(schools)
    } else {
      window.location.href = "/superadmin/login"
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const handleFocus = () => {
      refreshSchools()
    }

    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("superadmin-auth")
    localStorage.removeItem("superadmin-email")
    window.location.href = "/superadmin/login"
  }

  const totalSchools = allSchools.length
  const totalStudents = allSchools.reduce((sum, school) => sum + (school.students?.length || 0), 0)
  const totalTeachers = allSchools.reduce((sum, school) => sum + (school.teachers?.length || 0), 0)
  const activeSchools = allSchools.filter((school) => school.status === "active").length

  const stats = [
    {
      title: "Total Schools",
      value: totalSchools.toString(),
      change: `${
        allSchools.filter((school) => {
          const createdDate = new Date(school.createdAt)
          const lastMonth = new Date()
          lastMonth.setMonth(lastMonth.getMonth() - 1)
          return createdDate > lastMonth
        }).length
      } this month`,
      icon: School,
      color: "text-blue-500",
    },
    {
      title: "Total Students",
      value: totalStudents.toLocaleString(),
      change: `Across ${totalSchools} schools`,
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Total Teachers",
      value: totalTeachers.toLocaleString(),
      change: `${activeSchools} active schools`,
      icon: GraduationCap,
      color: "text-purple-500",
    },
    {
      title: "System Status",
      value: "99.9%",
      change: "Uptime last 30 days",
      icon: TrendingUp,
      color: "text-yellow-500",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {/* Main logo container */}
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
                  <div className="bg-white rounded-md w-6 h-6 flex items-center justify-center transform -rotate-3">
                    <div className="text-blue-600 font-bold text-xs">📚</div>
                  </div>
                </div>
                {/* Tech indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Hi-Tech Super Admin Dashboard</h1>
                <p className="text-sm text-gray-600">System-wide management and analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button variant="outline" onClick={refreshSchools}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/superadmin/schools/add">
                  <Plus className="w-4 h-4 mr-2" />
                  Add School
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Schools */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Schools
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/superadmin/schools">View All ({allSchools.length})</Link>
                  </Button>
                </CardTitle>
                <CardDescription>Latest school registrations and their current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allSchools.length === 0 ? (
                    <div className="text-center py-8">
                      <School className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No schools have been added yet.</p>
                      <Button asChild className="mt-4" style={{ backgroundColor: "#3B82F6" }}>
                        <Link href="/superadmin/schools/add">
                          <Plus className="w-4 h-4 mr-2" />
                          Add First School
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    allSchools.slice(0, 4).map((school, index) => (
                      <div key={school.id || index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          {school.logoUrl ? (
                            <img
                              src={school.logoUrl || "/placeholder.svg"}
                              alt={`${school.name} logo`}
                              className="w-10 h-10 object-cover rounded-full border-2"
                              style={{ borderColor: school.colorTheme }}
                            />
                          ) : (
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                              style={{
                                backgroundColor: school.colorTheme + "20",
                                borderColor: school.colorTheme,
                              }}
                            >
                              <School className="w-5 h-5" style={{ color: school.colorTheme }} />
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium text-gray-900">{school.name}</h4>
                            <p className="text-sm text-gray-600">Code: {school.schoolCode}</p>
                            <p className="text-xs text-gray-500">
                              Created: {new Date(school.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{school.students?.length || 0} students</p>
                            <p className="text-xs text-gray-500">{school.teachers?.length || 0} teachers</p>
                            <Badge
                              variant={
                                school.status === "active"
                                  ? "default"
                                  : school.status === "setup"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {school.status}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => window.open(school.portalUrl, "_blank")}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/superadmin/schools/add">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New School
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/superadmin/schools">
                    <School className="w-4 h-4 mr-2" />
                    Manage Schools
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Database</span>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">API Services</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Storage</span>
                  <Badge className="bg-yellow-100 text-yellow-800">78% Used</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Backup</span>
                  <Badge className="bg-green-100 text-green-800">Up to date</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
