import React, { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { sampleEvents, eventCategories } from '../../../assets/assets';
import type { Event } from '../../../assets/assets';
import { Calendar, MapPin, Clock, Tag, Mail, Image as ImageIcon } from "lucide-react";

// Define the expected search params type
interface EditEventsSearch {
  id?: string;
}

const EditEvents: React.FC = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: '__root__' }) as EditEventsSearch;
  const eventId = Number(search.id);

  const eventToEdit = sampleEvents.find(e => e.id === eventId);

  // Always call useState at the top
  const [form, setForm] = useState<Omit<Event, 'id'> | null>(() => {
    if (!eventToEdit) return null;
    return {
      title: eventToEdit.title,
      date: eventToEdit.date,
      location: eventToEdit.location,
      organizer: eventToEdit.organizer,
      category: eventToEdit.category,
      startTime: eventToEdit.startTime,
      endTime: eventToEdit.endTime,
      description: eventToEdit.description,
      detailedDescription: eventToEdit.detailedDescription,
      image: eventToEdit.image,
      tags: eventToEdit.tags,
      registrationOpen: eventToEdit.registrationOpen,
      registrationClosed: eventToEdit.registrationClosed,
      maxAttendees: eventToEdit.maxAttendees,
      currentAttendees: eventToEdit.currentAttendees,
      registrationDeadline: eventToEdit.registrationDeadline,
      contactEmail: eventToEdit.contactEmail,
    };
  });

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-4 text-red-600">Event not found</h2>
          <button
            onClick={() => navigate({ to: '/' })}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded text-primary font-semibold"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev!,
      [name]:
        name === 'tags'
          ? value.split(',').map(tag => tag.trim())
          : type === 'number'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEvents = sampleEvents.map(event =>
      event.id === eventId ? { id: eventId, ...form } : event
    );
    console.log('Updated events:', updatedEvents);
    navigate({ to: '/' });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold text-[#3D007B] mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md transition-all duration-200 text-sm text-gray-800"
                placeholder="Enter event title"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Short Description *
              </label>
              <textarea
                name="description"
                required
                rows={2}
                value={form.description}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
                placeholder="Brief description for preview"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Detailed Description *
              </label>
              <textarea
                name="detailedDescription"
                required
                rows={4}
                value={form.detailedDescription}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
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
                name="tags"
                value={form.tags.join(', ')}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
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
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setForm(prev => ({ ...prev!, image: reader.result as string }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="block w-full text-sm text-gray-800 cursor-pointer file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-[#3D007B] hover:file:bg-yellow-100"
              />
              {form.image && typeof form.image === "string" && (
                <img
                  src={form.image}
                  alt="Event"
                  className="w-32 h-20 object-cover mt-2 rounded"
                />
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                required
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
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
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Clock className="w-3 h-3 inline mr-1" />
                Start Time *
              </label>
              <input
                type="time"
                name="startTime"
                required
                value={form.startTime}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Clock className="w-3 h-3 inline mr-1" />
                End Time *
              </label>
              <input
                type="time"
                name="endTime"
                required
                value={form.endTime}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <MapPin className="w-3 h-3 inline mr-1" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                value={form.location}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
                placeholder="Event location"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Organizer *
              </label>
              <input
                type="text"
                name="organizer"
                required
                value={form.organizer}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
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
                name="contactEmail"
                required
                value={form.contactEmail}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
                placeholder="Contact email"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Registration Deadline *
              </label>
              <input
                type="date"
                name="registrationDeadline"
                required
                value={form.registrationDeadline}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Max Attendees *
              </label>
              <input
                type="number"
                name="maxAttendees"
                min={1}
                required
                value={form.maxAttendees}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Current Attendees
              </label>
              <input
                type="number"
                name="currentAttendees"
                min={0}
                value={form.currentAttendees}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800"
              />
            </div>
            <div className="flex items-center gap-4 md:col-span-2">
              <label className="flex items-center text-xs font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={form.registrationOpen}
                  onChange={(e) => setForm(prev => ({ ...prev!, registrationOpen: e.target.checked }))}
                  className="w-3 h-3 text-yellow-400 border-gray-300 rounded mr-2"
                />
                Registration Open
              </label>
              <label className="flex items-center text-xs font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={form.registrationClosed}
                  onChange={(e) => setForm(prev => ({ ...prev!, registrationClosed: e.target.checked }))}
                  className="w-3 h-3 text-yellow-400 border-gray-300 rounded mr-2"
                />
                Registration Closed
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate({ to: '/' })}
            className="px-4 py-1.5 border border-gray-300 text-[#3D007B] rounded-md hover:bg-[#f4f0ff] transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors text-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvents;
