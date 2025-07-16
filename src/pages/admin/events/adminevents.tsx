import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { sampleEvents } from '../../../assets/assets';
import type { Event } from '../../../assets/assets';
import DeleteEventConfirmModal from '@/components/admin/events/deleteeventconfirmmodal';
import { useNavigate } from '@tanstack/react-router';

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  // const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const navigate = useNavigate();

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
    setIsDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'seminar': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'competition': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isPast = (date: string) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-primary">
              Events Management
            </h3>
            <div className="w-48 h-1 bg-yellow-400 mt-2"></div>
          </div>
          <button
            onClick={() => navigate({ to: "/dashboard/admin/events/addevents" as string })}
            className="bg-yellow-400 hover:bg-yellow-500 text-primary font-semibold px-6 py-2 rounded-md text-sm transition cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Event
          </button>
        </div>

        {events.length > 0 ? (
          <div className="my-10">
            {events.map(event => (
              <div
                key={event.id}
                className="border-b hover:bg-[#f4f0ff] group transition"
              >
                <div className="flex items-center justify-between gap-4 py-4 px-2 md:px-6">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#3D007B] group-hover:underline mb-2">
                      {event.title}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                      {isPast(event.date) && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Past
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigate({ to: `/dashboard/admin/events/editevents?id=${event.id}` }); // <-- add 's'
                      }}
                      className="p-2 text-green-500 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit Event"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 px-2 md:px-6 pb-3">
                  Date: {event.date} • Location: {event.location} • Organizer: {event.organizer}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">
              Get started by adding your first event.
            </p>
            <button
              onClick={() => navigate({ to: "/" })}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md text-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2 inline" />
              Add First Event
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEvent}
      /> */}
      {selectedEvent && (
        <DeleteEventConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
          onDelete={() => handleDeleteEvent(selectedEvent.id)}
        />
      )}
    </div>
  );
};

export default AdminEvents;