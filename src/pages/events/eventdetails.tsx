import React from 'react';
import { useParams } from '@tanstack/react-router';

const EventDetails: React.FC = () => {
  const { eventId } = useParams({ strict: false });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Event Header Image */}
          <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          <div className="p-8">
            {/* Event Title and Date */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Event Details {eventId && `- ${eventId}`}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>July 15, 2025 | 9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Main Auditorium, CS Department</span>
              </div>
            </div>
            
            {/* Event Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            
            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Event Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Duration:</strong> 8 hours</li>
                  <li><strong>Capacity:</strong> 200 attendees</li>
                  <li><strong>Registration Fee:</strong> Free</li>
                  <li><strong>Category:</strong> Technology</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Organizer:</strong> CS Department</li>
                  <li><strong>Email:</strong> events@csedu.com</li>
                  <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                  <li><strong>Website:</strong> www.csedu.com</li>
                </ul>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                Register Now
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                Share Event
              </button>
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;