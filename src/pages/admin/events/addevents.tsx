import React, { useState } from "react";
import { Calendar,  MapPin, Clock, Tag, Mail, Image as ImageIcon } from "lucide-react";
// import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { eventCategories } from "../../../assets/assets";

const AddEvents: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    image: null as File | null,
    tags: "",
    registrationOpen: false,
    registrationClosed: false,
    maxAttendees: 0,
    currentAttendees: 0,
    category: "workshop" as
      | "workshop"
      | "hackathon"
      | "seminar"
      | "career"
      | "bootcamp"
      | "competition",
    organizer: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "",
    endTime: "",
    location: "",
    registrationDeadline: "",
    contactEmail: "",
  });

//   const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, image: null });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send formData to backend or update global state
    setFormData({
      title: "",
      description: "",
      detailedDescription: "",
      image: null,
      tags: "",
      registrationOpen: false,
      registrationClosed: false,
      maxAttendees: 0,
      currentAttendees: 0,
      category: "workshop",
      organizer: "",
      date: new Date().toISOString().split("T")[0],
      startTime: "",
      endTime: "",
      location: "",
      registrationDeadline: "",
      contactEmail: "",
    });
    toast.success("Event added successfully!");
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      detailedDescription: "",
      image: null,
      tags: "",
      registrationOpen: false,
      registrationClosed: false,
      maxAttendees: 0,
      currentAttendees: 0,
      category: "workshop",
      organizer: "",
      date: new Date().toISOString().split("T")[0],
      startTime: "",
      endTime: "",
      location: "",
      registrationDeadline: "",
      contactEmail: "",
    });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold text-[#3D007B] mb-4">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md transition-all duration-200 focus:w-[102%] hover:border-[#7C3AED] text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Enter event title"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Short Description *
              </label>
              <textarea
                required
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md transition-all duration-200 focus:w-[102%] hover:border-[#7C3AED] text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Brief description for preview"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Detailed Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.detailedDescription}
                onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md transition-all duration-200 focus:w-[102%] hover:border-[#7C3AED] text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Full detailed description"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Tag className="w-3 h-3 inline mr-1" />
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800"
                placeholder="e.g. Workshop, AI, Beginner"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <ImageIcon className="w-3 h-3 inline mr-1" />
                Event Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-800 cursor-pointer file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-[#3D007B] hover:file:bg-yellow-100"
              />
              {formData.image && (
                <span className="text-xs text-gray-600 mt-1 block">
                  Selected: {formData.image.name}
                </span>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as typeof formData.category,
                  })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800"
              >
                {eventCategories
                  .filter((cat) => cat.id !== "all")
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Calendar className="w-3 h-3 inline mr-1" />
                Event Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Clock className="w-3 h-3 inline mr-1" />
                Start Time *
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Clock className="w-3 h-3 inline mr-1" />
                End Time *
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <MapPin className="w-3 h-3 inline mr-1" />
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Event location"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Organizer *
              </label>
              <input
                type="text"
                required
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Organizer name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Mail className="w-3 h-3 inline mr-1" />
                Contact Email *
              </label>
              <input
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Contact email"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Registration Deadline *
              </label>
              <input
                type="date"
                required
                value={formData.registrationDeadline}
                onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Max Attendees *
              </label>
              <input
                type="number"
                min={1}
                required
                value={formData.maxAttendees}
                onChange={(e) => setFormData({ ...formData, maxAttendees: Number(e.target.value) })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800"
                placeholder="Maximum number of attendees"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Current Attendees
              </label>
              <input
                type="number"
                min={0}
                value={formData.currentAttendees}
                onChange={(e) => setFormData({ ...formData, currentAttendees: Number(e.target.value) })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800"
                placeholder="Current number of attendees"
              />
            </div>
            <div className="flex items-center gap-4 md:col-span-2">
              <label className="flex items-center text-xs font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.registrationOpen}
                  onChange={(e) => setFormData({ ...formData, registrationOpen: e.target.checked })}
                  className="w-3 h-3 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400 mr-2"
                />
                Registration Open
              </label>
              <label className="flex items-center text-xs font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.registrationClosed}
                  onChange={(e) => setFormData({ ...formData, registrationClosed: e.target.checked })}
                  className="w-3 h-3 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400 mr-2"
                />
                Registration Closed
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-1.5 border border-gray-300 text-[#3D007B] rounded-md hover:bg-[#f4f0ff] transition-colors cursor-pointer text-sm"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 bg-yellow-400 text-[#3D007B] font-semibold rounded-md hover:bg-yellow-500 transition-colors cursor-pointer text-sm"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvents;