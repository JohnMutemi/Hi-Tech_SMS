"use client"

import type React from "react"
import { useState } from "react"
import { createSchool } from "@/lib/actions/school-actions"

interface AddSchoolFormProps {
  onSchoolAdded?: () => void
}

const AddSchoolForm: React.FC<AddSchoolFormProps> = ({ onSchoolAdded }) => {
  const [schoolData, setSchoolData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    code: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSchoolData({ ...schoolData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData()
    formData.append("name", schoolData.name)
    formData.append("address", schoolData.address)
    formData.append("phone", schoolData.phone)
    formData.append("email", schoolData.email)
    if (schoolData.code) formData.append("code", schoolData.code)

    const result = await createSchool(formData)

    if (result.error) {
      setError(result.error)
    } else if (result.success) {
      onSchoolAdded?.()
      setSchoolData({ name: "", address: "", phone: "", email: "", code: "" })
      // Show success message with temp password
      alert(
        `School created successfully!\nSchool Code: ${result.schoolCode}\nTemporary Password: ${result.tempPassword}`,
      )
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          School Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={schoolData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={schoolData.address}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={schoolData.phone}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={schoolData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">
          School Code (Optional)
        </label>
        <input
          type="text"
          id="code"
          name="code"
          value={schoolData.code}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create School"}
        </button>
      </div>
    </form>
  )
}

export default AddSchoolForm
