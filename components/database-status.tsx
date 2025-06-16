"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, CheckCircle, XCircle, RefreshCw } from "lucide-react"

interface DatabaseStatus {
  connected: boolean
  tablesExist: boolean
  superAdminExists: boolean
  error?: string
}

export function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkDatabaseStatus = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/database/status")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      setStatus({
        connected: false,
        tablesExist: false,
        superAdminExists: false,
        error: "Failed to check database status",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  if (!status && !isLoading) {
    return null
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <span>Database Status</span>
        </CardTitle>
        <CardDescription>Current database connection and setup status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
            <span className="ml-2">Checking database...</span>
          </div>
        ) : status ? (
          <>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Connection</span>
                <Badge variant={status.connected ? "default" : "destructive"}>
                  {status.connected ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" /> Connected
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" /> Disconnected
                    </>
                  )}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Tables Setup</span>
                <Badge variant={status.tablesExist ? "default" : "secondary"}>
                  {status.tablesExist ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" /> Complete
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" /> Missing
                    </>
                  )}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Super Admin</span>
                <Badge variant={status.superAdminExists ? "default" : "secondary"}>
                  {status.superAdminExists ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" /> Ready
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" /> Not Found
                    </>
                  )}
                </Badge>
              </div>
            </div>

            {status.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{status.error}</p>
              </div>
            )}

            <Button onClick={checkDatabaseStatus} variant="outline" className="w-full" disabled={isLoading}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Status
            </Button>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
