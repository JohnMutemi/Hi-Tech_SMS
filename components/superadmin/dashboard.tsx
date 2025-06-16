"use client"

import { useState, useEffect } from "react"

const SuperAdminDashboard = () => {
  const [schools, setSchools] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch("/api/schools")
        if (response.ok) {
          const data = await response.json()
          setSchools(data.schools || [])
        }
      } catch (error) {
        console.error("Error fetching schools:", error)
      }
      setIsLoading(false)
    }

    fetchSchools()
  }, [])

  return (
    <div>
      <h1>Super Admin Dashboard</h1>
      {isLoading ? (
        <p>Loading schools...</p>
      ) : (
        <ul>
          {schools.map((school) => (
            <li key={school.id}>{school.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SuperAdminDashboard
