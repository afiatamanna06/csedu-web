import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const BookingRequests = () => {
  // Convert bookings to state so we can update it
  const [bookings, setBookings] = useState([
    {
      id: "B1",
      room: "Room 101",
      room_id: "A101",
      date: "2024-07-20",
      time: "10:00 AM - 12:00 PM",
      requester: "Alice Johnson",
      purpose: "Project Meeting",
      status: "m"
    },
    {
      id: "B2",
      room: "Room 202",
      room_id: "A102",
      date: "2024-07-21",
      time: "02:00 PM - 04:00 PM",
      requester: "Bob Williams",
      purpose: "Presentation Practice",
      status: "accepted"
    },
    {
      id: "B3",
      room: "Room 103",
      room_id: "B201",
      date: "2024-07-22",
      time: "11:00 AM - 01:00 PM",
      requester: "Charlie Brown",
      purpose: "Group Study",
      status: "rejected"
    },
    {
      id: "B4",
      room: "Room 201",
      room_id: "B202",
      date: "2024-07-23",
      time: "09:00 AM - 11:00 AM",
      requester: "Diana Green",
      purpose: "Seminar",
      status: "m"
    },
    {
      id: "B5",
      room: "Room 102",
      room_id: "C301",
      date: "2024-07-24",
      time: "03:00 PM - 05:00 PM",
      requester: "Ethan White",
      purpose: "Workshop",
      status: "accepted"
    }
  ]);

  const handleAction = (action, booking) => {
    let newStatus;
    let message;

    if (booking.status === 'm') {
      // Initial actions for status 'm'
      newStatus = action === 'accept' ? 'accepted' : 'rejected';
      message = action === 'accept' ? 'Booking accepted successfully!' : 'Booking rejected';
    } else if (booking.status === 'accepted' && action === 'reject') {
      // Change from accepted to rejected
      newStatus = 'rejected';
      message = 'Booking changed to rejected';
    } else if (booking.status === 'rejected' && action === 'accept') {
      // Change from rejected to accepted
      newStatus = 'accepted';
      message = 'Booking changed to accepted';
    } else {
      return; // No valid action to take
    }
    
    // Update the booking status
    setBookings(prevBookings => 
      prevBookings.map(b => 
        b.id === booking.id 
          ? { ...b, status: newStatus }
          : b
      )
    );
    
    alert(message);

    // In a real application, you would make an API call here
    console.log('Action:', action, 'Booking:', booking, 'New Status:', newStatus);
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'm':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to check if actions should be enabled
  const isActionEnabled = (action, status) => {
    if (status === 'm') return true;
    if (status === 'accepted' && action === 'reject') return true;
    if (status === 'rejected' && action === 'accept') return true;
    return false;
  };

  // Function to get button styles based on enabled state
  const getButtonStyle = (action, isEnabled) => {
    const baseStyle = 'px-2 py-1 rounded transition-colors duration-200';
    if (!isEnabled) return `${baseStyle} text-gray-400 cursor-not-allowed`;
    
    switch (action) {
      case 'accept':
        return `${baseStyle} text-green-600 hover:text-green-800`;
      case 'reject':
        return `${baseStyle} text-red-600 hover:text-red-800`;
      default:
        return baseStyle;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Requests</h1>
          <p className="text-gray-600">Manage and review incoming booking requests.</p>
        </div>

        {/* Booking Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FFC300]">
                <th className="text-left py-3 px-6 text-sm font-semibold">Room</th>
                <th className="text-left py-3 px-6 text-sm font-semibold">Date</th>
                <th className="text-left py-3 px-6 text-sm font-semibold">Time</th>
                <th className="text-left py-3 px-6 text-sm font-semibold">Requester</th>
                <th className="text-left py-3 px-6 text-sm font-semibold">Purpose</th>
                <th className="text-left py-3 px-6 text-sm font-semibold">Status</th>
                <th className="text-left py-3 px-6 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-6 text-sm text-gray-600">{booking.room}</td>
                  <td className="py-3 px-6 text-sm text-gray-600">{booking.date}</td>
                  <td className="py-3 px-6 text-sm text-gray-600">{booking.time}</td>
                  <td className="py-3 px-6 text-sm text-gray-600">{booking.requester}</td>
                  <td className="py-3 px-6 text-sm text-gray-600">{booking.purpose}</td>
                  <td className="py-3 px-6">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(booking.status)}`}>
                      {booking.status === 'm' ? 'Pending' : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex space-x-2 text-sm">
                      {(booking.status === 'm' || booking.status === 'rejected') && (
                        <>
                          <button 
                            onClick={() => handleAction('accept', booking)}
                            disabled={!isActionEnabled('accept', booking.status)}
                            className={getButtonStyle('accept', isActionEnabled('accept', booking.status))}
                          >
                            Accept
                          </button>
                          {booking.status === 'm' && <span className="text-gray-300">|</span>}
                        </>
                      )}
                      {(booking.status === 'm' || booking.status === 'accepted') && (
                        <button 
                          onClick={() => handleAction('reject', booking)}
                          disabled={!isActionEnabled('reject', booking.status)}
                          className={getButtonStyle('reject', isActionEnabled('reject', booking.status))}
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingRequests; 