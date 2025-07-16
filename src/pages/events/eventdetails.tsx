"use client"

import { useState, useEffect } from "react"
import { useParams } from "@tanstack/react-router"
import { Calendar, MapPin, Clock, Tag, User, ChevronLeft, Share2, Printer, CheckCircle } from "lucide-react"
import { sampleEvents} from "../../assets/assets"
import RegistrationForm from "../../components/events/registerform"
import RegistrationSuccessModal from "../../components/events/registrationsuccessmodal"
import { type RegistrationDetails } from "../../components/events/registrationdetails"

const EventDetails = () => {
  // const { eventId } = useParams({ from: "/news/events/$eventId" })
    const { eventId } = useParams({ strict: false })
  const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [registrationDetails, setRegistrationDetails] = useState<RegistrationDetails | null>(null)

    // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // Find the event item by ID
  const event = sampleEvents.find((item) => item.id === Number.parseInt(eventId))

  // If event not found, show error message
  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">The requested event could not be found.</p>
          <button
            onClick={() => (window.location.href = "/news/events")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    )
  }

  // Check if registration is open and valid
  const now = new Date()
  const eventDate = new Date(event.date)
  const registrationDeadline = event.registrationDeadline ? new Date(event.registrationDeadline) : eventDate
  const isRegistrationOpen = event.registrationOpen && !event.registrationClosed && now <= registrationDeadline && now <= eventDate
  const isEventFull = event.maxAttendees && event.currentAttendees >= event.maxAttendees

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Event link copied to clipboard!")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const time = new Date()
    time.setHours(parseInt(hours), parseInt(minutes))
    return time.toLocaleTimeString("en-US", {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleRegister = () => {
    setIsRegistrationFormOpen(true)
  }

  const handleRegistrationSuccess = (details: RegistrationDetails) => {
    setRegistrationDetails(details)
    setIsRegistrationFormOpen(false)
    setIsSuccessModalOpen(true)
  }

  const handleCloseRegistrationForm = () => {
    setIsRegistrationFormOpen(false)
  }

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false)
    setRegistrationDetails(null)
  }


  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="w-full max-w-[1440px] mx-auto px-30 py-16">
        {/* Back Button */}
        <div className="pt-[90px] pb-[22px]">
          <button
            onClick={() => (window.location.href = "/news/events")} // Changed from "/events" to "/news/events"
            className="flex items-center gap-3 text-[#13274C] hover:text-[#13274C]/80 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold text-base leading-6">Back to Events</span>
          </button>
        </div>

        {/* Event Image */}
        <div className="mb-[10px]">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-[400px] object-cover rounded-t-xl rounded-tr-xl shadow-lg"
          />
        </div>

        {/* Main Title and Category */}
        <div className="mb-[25px] flex justify-between items-start">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {/* Updated Tags Section */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {event.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {event.tags.length > 3 && (
                    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{event.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
            <h1 className="font-semibold text-[26px] leading-[39px] text-black max-w-[974px]">{event.title}</h1>
          </div>

          {/* Share and Print Buttons - Now with Tooltip */}
          <div className="flex items-center gap-4">
            {/* Share Button with Tooltip */}
            <div className="relative group">
              <button
                onClick={handleShare}
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                aria-label="Share this event"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                Share this event
              </div>
            </div>

            {/* Print Button with Tooltip */}
            <div className="relative group">
              <button
                onClick={() => window.print()}
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                aria-label="Print this event"
              >
                <Printer className="w-5 h-5 text-gray-700" />
              </button>
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                Print this event
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-[#E5E7EB] mb-[25px]"></div>

        {/* Event Info Grid */}
        <div className="grid grid-cols-2 gap-[642px] mb-[25px]">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-[43px] h-[40px] bg-[#EFF6FF] rounded flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-[21px] text-[#374151]">{formatDate(event.date)}</p>
                <p className="text-xs leading-[18px] text-[#6B7280]">Event Date</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-[43px] h-[40px] bg-[#F0FDF4] rounded flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#16A34A]" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-[21px] text-[#374151]">
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </p>
                <p className="text-xs leading-[18px] text-[#6B7280]">Time</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-[43.8px] h-[38px] bg-[#FAF5FF] rounded flex items-center justify-center">
                <MapPin className="w-[19.8px] h-[22px] text-[#9333EA]" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-[21px] text-[#374151]">{event.location}</p>
                <p className="text-xs leading-[18px] text-[#6B7280]">Location</p>
              </div>
            </div>

            {event.registrationDeadline && (
              <div className="flex items-center gap-4">
                <div className="w-[43px] h-[40px] bg-[#FEF2F2] rounded flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div>
                  <p className="font-semibold text-sm leading-[21px] text-[#374151]">
                    {formatDate(event.registrationDeadline)}
                  </p>
                  <p className="text-xs leading-[18px] text-[#6B7280]">Registration Deadline</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {isEventFull && isRegistrationOpen && (
          <div className="mb-[25px]">
            <div className="px-4 py-3 bg-yellow-50 border border-yellow-300 rounded-lg">
              <p className="text-yellow-800 font-medium">This event is full</p>
            </div>
          </div>
        )}

        {/* Divider Line */}
        <div className="w-full h-px bg-[#E5E7EB] mb-[30px]"></div>

        {/* Event Content */}
        <div className="mb-[5px]">
          <div className="max-w-[1162px] text-l leading-[30px] text-[#374151] font-medium text-justify">
            {event.detailedDescription ? (
              event.detailedDescription.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-6 whitespace-pre-line">
                  {paragraph.trim()}
                </p>
              ))
            ) : (
              <p className="whitespace-pre-line">{event.description}</p>
            )}
          </div>
        </div>

        {/* Event Requirements */}
        {(event.requiresTshirt || event.requiresEmergencyContact || event.includesMeals) && (
          <div className="mb-[50px]">
            <h2 className="font-semibold text-[22px] leading-[33px] text-black mb-[20px]">Event Information</h2>
            <div className="space-y-3">
              {event.includesMeals && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-[#374151]">Meals included</span>
                </div>
              )}
              {event.requiresTshirt && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-[#374151]">T-shirt size required during registration</span>
                </div>
              )}
              {event.requiresEmergencyContact && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-[#374151]">Emergency contact information required</span>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Divider Line */}
        <div className="w-full h-px bg-[#E5E7EB] mb-[30px]"></div>

        {/* Organizer Section */}
        <div className="mb-[30px]">
          <div className="text-left">
            <h3 className="font-semibold text-[18px] leading-[27px] text-[#374151] mb-2">Event Organiser</h3>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center">
                <User className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <p className="font-medium text-[14px] leading-[24px] text-[#374151]">{event.organizer}</p>
            </div>
          </div>
        </div>

  
        {/* Divider Line */}
        {/* <div className="w-full h-px bg-[#E5E7EB] mb-[30px]"></div> */}

        {/* Registration Status Messages */}
        {isRegistrationOpen && !isEventFull && (
          <div className="mb-[25px]">
            <div className="flex items-center px-6 py-4 gap-4 w-full max-w-[1300px] mx-auto bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-[16px] leading-[24px] text-[#15803D]">
                  Registration Open
                </h3>
                <p className="font-medium text-[14px] leading-[20px] text-[#15803D]">
                  Registration closes on {event.registrationDeadline ? formatDate(event.registrationDeadline) : formatDate(event.date)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Register Now Button */}
        {isRegistrationOpen && !isEventFull && (
          <div className="mb-[25px] flex justify-center">
            <button
              onClick={handleRegister}
              className="flex flex-row justify-center items-center px-4 py-2 gap-2 w-[160px] h-[36px] bg-yellow-400 rounded-lg font-semibold text-sm text-black cursor-pointer hover:bg-yellow-500 transition-colors"
            >
              Register Now
            </button>
          </div>
        )}

        {!isRegistrationOpen && (
          <div className="mb-[25px] flex justify-center">
            <div className="px-4 py-3 bg-orange-50 border border-orange-300 rounded-lg">
              <p className="text-orange-700 font-medium text-center">
                {now > eventDate 
                  ? "This event has ended" 
                  : now > registrationDeadline 
                  ? "Registration deadline has passed" 
                  : event.registrationClosed 
                  ? "Registration is closed" 
                  : "Registration is not open yet"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Registration Form Modal */}
      <RegistrationForm
        event={event}
        isOpen={isRegistrationFormOpen}
        onClose={handleCloseRegistrationForm}
        onRegistrationSuccess={handleRegistrationSuccess}
      />

      {/* Registration Success Modal */}
      <RegistrationSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        registrationDetails={registrationDetails}
        event={event}
      />
    </div>
  )
}

export default EventDetails