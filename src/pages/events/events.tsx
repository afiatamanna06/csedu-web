"use client"
import { useState, useEffect, useMemo } from "react"
import type React from "react"

import { Search, Calendar, X } from "lucide-react"
import EventCard from "../../components/events/eventcard"
import RegistrationForm from "../../components/events/registerform"
import RegistrationSuccessModal from "../../components/events/registrationsuccessmodal"
import Pagination from "../../components/pagination/pagination"
import { sampleEvents, eventCategories, type Event } from "../../assets/assets"
import { toast } from "react-toastify"
import { useNavigate } from "@tanstack/react-router"
import { type RegistrationDetails } from "../../components/events/registrationdetails" 

// Simple Badge component
interface BadgeProps {
  variant?: "primary" | "secondary"
  className?: string
  children: React.ReactNode
}

const Badge = ({ variant = "primary", className = "", children }: BadgeProps) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
  const variantClasses = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
  }
  return <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>{children}</span>
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode] = useState("grid") 

  // Registration form states
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [registrationDetails, setRegistrationDetails] = useState<RegistrationDetails | null>(null)


  const eventsPerPage = 6
  const navigate = useNavigate()

  // Load events data
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      // Simulate API call delay
      setTimeout(() => {
        setEvents(sampleEvents)
        setLoading(false)
      }, 1000)
    }
    fetchEvents()
  }, [])

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.date)
      const today = new Date()
      // Only show upcoming events
      if (eventDate <= today) return false

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        if (
          !event.title.toLowerCase().includes(searchLower) &&
          !event.description.toLowerCase().includes(searchLower) &&
          !event.location.toLowerCase().includes(searchLower) &&
          !event.organizer.toLowerCase().includes(searchLower) &&
          !event.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        ) {
          return false
        }
      }

      // Category filter
      if (selectedCategory !== "all" && event.category !== selectedCategory) {
        return false
      }

      return true
    })

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        case "location":
          return a.location.localeCompare(b.location)
        case "popularity":
          return (b.currentAttendees || 0) - (a.currentAttendees || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [events, searchTerm, selectedCategory, sortBy])

  // Add this computed value for the next upcoming event
  const nextUpcomingEvent = useMemo(() => {
    return filteredAndSortedEvents.length > 0 ? filteredAndSortedEvents[0] : null
  }, [filteredAndSortedEvents])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedEvents.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const paginatedEvents = filteredAndSortedEvents.slice(startIndex, startIndex + eventsPerPage)

  const handleRegister = (event: Event) => {
    // Check if registration is open
    const now = new Date()
    const eventDate = new Date(event.date)
    const registrationDeadline = event.registrationDeadline ? new Date(event.registrationDeadline) : eventDate

    if (now > eventDate) {
      toast.error("This event has already passed")
      return
    }

    if (now > registrationDeadline) {
      toast.error("Registration deadline has passed")
      return
    }

    if (event.maxAttendees && event.currentAttendees >= event.maxAttendees) {
      toast.error("This event is full")
      return
    }

    // Open registration form
    setSelectedEvent(event)
    setShowRegistrationForm(true)
  }

  const handleRegistrationSuccess = (details: RegistrationDetails) => {
    setRegistrationDetails(details)
    setShowRegistrationForm(false)
    setShowSuccessModal(true)
    // Update the event's current attendees count
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEvent?.id ? { ...event, currentAttendees: (event.currentAttendees || 0) + 1 } : event,
      ),
    )
  }

  const handleCloseRegistrationForm = () => {
    setShowRegistrationForm(false)
    setSelectedEvent(null)
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    setRegistrationDetails(null)
    setSelectedEvent(null)
  }

  // Add these missing handlers for the modal functions
  const handleDownloadTicket = (details: RegistrationDetails) => {
    console.log("Downloading ticket:", details)
    // Implement actual download functionality here
    // For example, generate PDF or trigger download
  }

  const handleShareEvent = (event: Event, details: RegistrationDetails) => {
    console.log("Sharing event:", event, details)
    // Implement sharing functionality here
    // For example, copy to clipboard, social media sharing, etc.
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`Check out this event: ${event.title} at ${window.location.href}`)
      toast.success("Event link copied to clipboard!")
    }
  }

  const handleViewDetails = (event: Event) => {
    navigate({ to: `/news/events/${event.id}` })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSortBy("date")
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="relative w-full max-w-[1440px] mx-auto min-h-screen bg-white">
        <div className="px-6 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded-lg w-1/3 mb-8"></div>
            <div className="h-20 bg-gray-200 rounded-lg shadow mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl shadow p-6">
                  <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
                  <div className="h-20 bg-gray-300 rounded mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[1440px] mx-auto bg-white mt-32">
      {/* Hero Header */}
      <div className="bg-white">
        <div className="px-14 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Upcoming Events</h1>
            <div className="w-80 h-1 bg-primary-y mb-4 mx-auto"></div>
            {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Discover and join exciting events in our computer science community. From workshops to hackathons, find
              opportunities to learn and grow.
            </p> */}
            {/* Event Stats Badges */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <Badge variant="secondary" className="text-base font-semibold px-4 py-2">
                <Calendar className="w-5 h-5 mr-2" />
                {filteredAndSortedEvents.length} {filteredAndSortedEvents.length === 1 ? "Event" : "Events"}
              </Badge>
              <Badge variant="secondary" className="text-base font-semibold px-4 py-2">
                Next Event:{" "}
                {nextUpcomingEvent?.date
                  ? new Date(nextUpcomingEvent.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "TBD"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="px-12 py-4">
        {/* Filter and Search Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          {/* Left Side - Category and Sort Dropdowns */}
          <div className="flex flex-wrap gap-3">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 text-gray-dark px-3 py-1.5 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-sm cursor-pointer hover:border-gray-400 hover:shadow-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.5rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em 1.5em",
                paddingRight: "2.5rem",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
              }}
            >
              {eventCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer border border-gray-300 text-gray-dark px-3 py-1.5 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-sm hover:border-gray-400 hover:shadow-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.5rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em 1.5em",
                paddingRight: "2.5rem",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
              }}
            >
              <option value="date">Newest First</option>
              <option value="title">Sort by Title</option>
              <option value="location">Sort by Location</option>
              <option value="popularity">Sort by Popularity</option>
            </select>
          </div>

          {/* Right Side - Search Section */}
          <div className="flex items-center gap-4">
            {/* Search Form */}
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events..."
                className="border border-gray-300 text-gray-800 px-3 py-1.5 rounded-md text-sm w-70 focus:outline-none focus:ring-1 focus:ring-gray-300 pr-10"
              />
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 pr-3"
                type="submit"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Horizontal line separator */}
        {/* <div className="border-t border-gray-200 mb-3"></div> */}

        {/* Active Filters */}
        {(searchTerm || selectedCategory !== "all" || sortBy !== "date") && (
          <div className="flex items-center justify-between mb-2 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>Active filters:</span>
              {searchTerm && (
                <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                    title="Clear search filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  Category: {eventCategories.find((c) => c.id === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="ml-1 hover:bg-green-200 rounded-full p-0.5 transition-colors"
                    title="Clear category filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {sortBy !== "date" && (
                <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                  Sort: {sortBy}
                  <button
                    onClick={() => setSortBy("date")}
                    className="ml-1 hover:bg-orange-200 rounded-full p-0.5 transition-colors"
                    title="Reset sort to date"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
            <button onClick={clearFilters} className="cursor-pointer text-sm text-primary hover:text-primary/80 font-medium">
              Clear all
            </button>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-md text-gray-500">
            {filteredAndSortedEvents.length === 0
              ? "No events found"
              : `Showing ${filteredAndSortedEvents.length} upcoming ${filteredAndSortedEvents.length === 1 ? "event" : "events"}`}
          </div>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Events Grid/List */}
        {paginatedEvents.length > 0 ? (
          <div
            className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14" : "space-y-6"} mb-8`}
          >
            {paginatedEvents.map((event) => (
              <EventCard key={event.id} event={event} onRegister={handleRegister} onViewDetails={handleViewDetails} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-xl mb-8">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              Try adjusting your search terms or filters to find more events, or check back later for new upcoming
              events.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Registration Form Modal */}
      <RegistrationForm
        event={selectedEvent}
        isOpen={showRegistrationForm}
        onClose={handleCloseRegistrationForm}
        onRegistrationSuccess={handleRegistrationSuccess}
      />

      {/* Registration Success Modal */}
      <RegistrationSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        registrationDetails={registrationDetails}
        event={selectedEvent}
        onDownloadTicket={handleDownloadTicket}
        onShareEvent={handleShareEvent}
      />
    </div>
  )
}

export default Events
