"use client"

import type React from "react"
import { useState } from "react"
import { X, Calendar, Clock, MapPin, Users, User } from "lucide-react"
import type { Event } from "@/assets/assets"
import { toast } from "react-toastify"
import { type RegistrationDetails } from "./registrationdetails"

interface FormData {
  name: string
  email: string
  roll: string
  registrationId: string
  batchNo: string
  phone: string
  registrationFee: string
}

interface RegistrationFormProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
  onRegistrationSuccess: (data: RegistrationDetails) => void
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ event, isOpen, onClose, onRegistrationSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    roll: "",
    registrationId: "",
    batchNo: "",
    phone: "",
    registrationFee: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.roll.trim()) {
      newErrors.roll = "Roll number is required"
    }

    if (!formData.registrationId.trim()) {
      newErrors.registrationId = "Registration ID is required"
    }

    if (!formData.batchNo.trim()) {
      newErrors.batchNo = "Batch number is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[+]?[\d\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.registrationFee.trim()) {
      newErrors.registrationFee = "Registration fee is required"
    } else if (isNaN(Number(formData.registrationFee)) || Number(formData.registrationFee) < 0) {
      newErrors.registrationFee = "Please enter a valid amount"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly")
      return
    }

    setIsSubmitting(true)

    try {
      const mockRegistrationId = `REG-${Date.now()}`
      const mockConfirmationNumber = `CONF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success(
        <div>
          <div className="font-semibold">Registration Successful! 🎉</div>
          <div className="text-sm mt-1">Confirmation #: {mockConfirmationNumber}</div>
          <div className="text-sm">Check your email for details</div>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      )

      // Map form data to match the shared RegistrationDetails interface
      onRegistrationSuccess({
        registrationId: mockRegistrationId,
        confirmationNumber: mockConfirmationNumber,
        registrationData: {
          name: formData.name,
          email: formData.email,
          registrationNo: formData.registrationId, // Map registrationId to registrationNo
          phone: formData.phone,
          department: formData.batchNo, // Map batchNo to department
          registrationFee: formData.registrationFee,
        },
      })

      // Close form
      onClose()

      // Reset form
      setFormData({
        name: "",
        email: "",
        roll: "",
        registrationId: "",
        batchNo: "",
        phone: "",
        registrationFee: "",
      })
    } catch (error: unknown) {
      console.error("Registration error:", error)
      toast.error("Registration failed. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  if (!isOpen || !event) return null

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Event Registration</h2>
              <p className="text-gray-600 mt-1">Complete the form below to register</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isSubmitting}
              type="button"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Event Summary */}
        <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
          <h3 className="font-semibold text-blue-900 mb-2">{event.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            {event.maxAttendees && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  {event.currentAttendees || 0} / {event.maxAttendees} registered
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Registration Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="roll"
                  value={formData.roll}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.roll ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter your roll number"
                  disabled={isSubmitting}
                />
                {errors.roll && <p className="text-red-500 text-xs mt-1">{errors.roll}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="registrationId"
                  value={formData.registrationId}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.registrationId ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter your registration ID"
                  disabled={isSubmitting}
                />
                {errors.registrationId && <p className="text-red-500 text-xs mt-1">{errors.registrationId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="batchNo"
                  value={formData.batchNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.batchNo ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter your batch number"
                  disabled={isSubmitting}
                />
                {errors.batchNo && <p className="text-red-500 text-xs mt-1">{errors.batchNo}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter your phone number"
                  disabled={isSubmitting}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Fee <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="registrationFee"
                value={formData.registrationFee}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.registrationFee ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter registration fee amount"
                min="0"
                step="0.01"
                disabled={isSubmitting}
              />
              {errors.registrationFee && <p className="text-red-500 text-xs mt-1">{errors.registrationFee}</p>}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">By registering for this event, you agree to:</p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1 ml-4">
              <li>• Attend the event at the specified date and time</li>
              <li>• Follow all event guidelines and code of conduct</li>
              <li>• Provide accurate information in this registration form</li>
              <li>• Pay the registration fee as specified</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium transition-all duration-200 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90 transform hover:scale-105 shadow-lg cursor-pointer"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Registering...</span>
                </div>
              ) : (
                "Complete Registration"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
