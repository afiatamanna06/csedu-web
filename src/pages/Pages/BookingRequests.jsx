import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      courseCode: "CSE-101",
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
      courseCode: "CSE-201",
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
      courseCode: "CSE-301",
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
      courseCode: "CSE-401",
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
      courseCode: "CSE-402",
      status: "accepted"
    }
  ]);

  // State for room management
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    room_id: '',
    location: '',
    capacity: ''
  });

  const [showAddRoom, setShowAddRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const API_BASE_URL = 'http://localhost:8000'; // Update this to match your backend

  // Function to get the authorization token
  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  // Function to get authorization headers
  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };

  // Fetch all rooms from the API
  const fetchAllRooms = async () => {
    const token = getAuthToken();
    if (!token) {
      console.warn('No authentication token found');
      return;
    }

    try {
      setIsLoadingRooms(true);
      const response = await axios.get(`${API_BASE_URL}/room/all`, {
        headers: getAuthHeaders()
      });
      
      setRooms(response.data);
    } catch (error) {
      console.warn('Failed to fetch rooms:', error);
      if (error.response?.status === 401) {
        setMessage({ 
          text: 'Authentication failed. Please log in again.', 
          type: 'error' 
        });
      } else if (error.response?.status === 403) {
        setMessage({ 
          text: 'You do not have permission to view rooms.', 
          type: 'error' 
        });
      } else {
        console.warn('API not available, rooms will be shown when added manually');
      }
    } finally {
      setIsLoadingRooms(false);
    }
  };

  // Fetch rooms on component mount
  useEffect(() => {
    fetchAllRooms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  // Fixed addRoom function with proper Bearer token authentication
  const addRoom = async () => {
    if (!newRoom.room_id || !newRoom.location || !newRoom.capacity) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }
  
    // Check if token exists
    const token = getAuthToken();
    if (!token) {
      setMessage({ text: 'Authentication required. Please log in again.', type: 'error' });
      return;
    }
  
    try {
      setIsLoading(true);
      setMessage({ text: '', type: '' });
  
      // Try the API call with Bearer token
      try {
        const response = await axios.post(
          `${API_BASE_URL}/room/add`, 
          {
            room_id: newRoom.room_id,
            location: newRoom.location,
            capacity: parseInt(newRoom.capacity)
          }, 
          {
            headers: getAuthHeaders()
          }
        );
  
        setMessage({ text: 'Room added successfully!', type: 'success' });
        
        // Refresh the rooms list after successful addition
        await fetchAllRooms();
  
      } catch (apiError) {
        console.warn('API call failed:', apiError);
        console.warn('Error response:', apiError.response?.data);
        
        // Handle different error types
        if (apiError.response?.status === 401) {
          setMessage({ 
            text: 'Authentication failed. Please log in again.', 
            type: 'error' 
          });
          return;
        } else if (apiError.response?.status === 403) {
          setMessage({ 
            text: 'You do not have permission to add rooms. Only admins can add rooms.', 
            type: 'error' 
          });
          return;
        } else if (apiError.response?.status === 400) {
          const errorDetail = apiError.response?.data?.detail || 'Room with this ID already exists.';
          setMessage({ 
            text: errorDetail, 
            type: 'error' 
          });
          return;
        } else if (apiError.response?.status === 422) {
          const errorDetail = apiError.response?.data?.detail || 'Invalid data provided.';
          setMessage({ 
            text: `Validation error: ${errorDetail}`, 
            type: 'error' 
          });
          return;
        } else {
          // Fallback: Add to local state for development
          setRooms(prevRooms => [...prevRooms, {
            id: newRoom.room_id,
            location: newRoom.location,
            capacity: parseInt(newRoom.capacity)
          }]);
  
          setMessage({ 
            text: 'Room added locally (API endpoint not available)', 
            type: 'success' 
          });
        }
      }
  
      // Reset form and close modal
      setNewRoom({ room_id: '', location: '', capacity: '' });
      setShowAddRoom(false);
  
    } catch (error) {
      console.error('Error adding room:', error);
      setMessage({ 
        text: 'Failed to add room. Please try again.', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Updated handleAction function with Bearer token for booking actions
  const handleAction = async (action, booking) => {
    let newStatus;
    let alertMessage;

    if (booking.status === 'm') {
      // Initial actions for status 'm'
      newStatus = action === 'accept' ? 'accepted' : 'rejected';
      alertMessage = action === 'accept' ? 'Booking accepted successfully!' : 'Booking rejected';
    } else if (booking.status === 'accepted' && action === 'reject') {
      // Change from accepted to rejected
      newStatus = 'rejected';
      alertMessage = 'Booking changed to rejected';
    } else if (booking.status === 'rejected' && action === 'accept') {
      // Change from rejected to accepted
      newStatus = 'accepted';
      alertMessage = 'Booking changed to accepted';
    } else {
      return; // No valid action to take
    }

    // Check if token exists for API calls
    const token = getAuthToken();
    
    try {
      // Make API call to update booking status
      if (token) {
        try {
          await axios.put(
            `${API_BASE_URL}/booking/${booking.id}/status`,
            { status: newStatus },
            { headers: getAuthHeaders() }
          );
        } catch (apiError) {
          console.warn('API call for booking update failed:', apiError.message);
          // Continue with local update even if API fails
        }
      }

      // Update the booking status locally
      setBookings(prevBookings => 
        prevBookings.map(b => 
          b.id === booking.id 
            ? { ...b, status: newStatus }
            : b
        )
      );
      
      setMessage({ text: alertMessage, type: 'success' });

    } catch (error) {
      console.error('Error updating booking:', error);
      setMessage({ 
        text: 'Failed to update booking status. Please try again.', 
        type: 'error' 
      });
    }
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
    const baseStyle = 'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200';
    if (!isEnabled) return `${baseStyle} text-gray-400 cursor-not-allowed bg-gray-100`;
    
    switch (action) {
      case 'accept':
        return `${baseStyle} text-green-700 bg-green-100 hover:bg-green-200 hover:text-green-800`;
      case 'reject':
        return `${baseStyle} text-red-700 bg-red-100 hover:bg-red-200 hover:text-red-800`;
      default:
        return baseStyle;
    }
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Requests</h1>
              <p className="text-gray-600">Manage room bookings and room inventory.</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={fetchAllRooms}
                disabled={isLoadingRooms}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg disabled:opacity-50"
              >
                {isLoadingRooms ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Refresh Rooms</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setShowAddRoom(!showAddRoom)}
                className="px-6 py-3 bg-[#13274C] text-white rounded-lg font-semibold hover:bg-[#1e3a5f] transition-colors duration-200 flex items-center space-x-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add New Room</span>
              </button>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {/* Add Room Form - Collapsible */}
        {showAddRoom && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#13274C] flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Add New Room</span>
              </h2>
              <button
                onClick={() => {
                  setShowAddRoom(false);
                  setMessage({ text: '', type: '' });
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); addRoom(); }} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Room ID */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Room Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="room_id"
                      placeholder="e.g., A101"
                      value={newRoom.room_id}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#13274C] focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-1.414 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g., Building A, Floor 1"
                      value={newRoom.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#13274C] focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Capacity
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="capacity"
                      placeholder="e.g., 30"
                      value={newRoom.capacity}
                      onChange={handleInputChange}
                      min="1"
                      max="500"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#13274C] focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setNewRoom({ room_id: '', location: '', capacity: '' });
                    setShowAddRoom(false);
                    setMessage({ text: '', type: '' });
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-[#FFC300] text-[#13274C] rounded-lg font-semibold hover:bg-[#FFD700] transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#13274C]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add Room</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Booking Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="px-6 py-4 bg-[#FFC300]">
            <h3 className="text-lg font-bold text-[#13274C]">Booking Requests</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Room</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Course Code</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Time</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Requester</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Purpose</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-6 text-sm text-gray-700 font-medium">{booking.room}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{booking.courseCode}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{booking.date}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{booking.time}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{booking.requester}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{booking.purpose}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(booking.status)}`}>
                      {booking.status === 'm' ? 'Pending' : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      {(booking.status === 'm' || booking.status === 'rejected') && (
                        <button 
                          onClick={() => handleAction('accept', booking)}
                          disabled={!isActionEnabled('accept', booking.status)}
                          className={getButtonStyle('accept', isActionEnabled('accept', booking.status))}
                        >
                          Accept
                        </button>
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

        {/* All Rooms Display */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-[#FFC300] flex justify-between items-center">
            <h3 className="text-lg font-bold text-[#13274C]">All Rooms</h3>
            {isLoadingRooms && (
              <div className="flex items-center space-x-2 text-[#13274C]">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm font-medium">Loading rooms...</span>
              </div>
            )}
          </div>
          
          {rooms.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Room ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Location</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-6 text-sm text-gray-700 font-medium">{room.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{room.location}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{room.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No rooms found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {isLoadingRooms ? 'Loading rooms...' : 'Get started by adding a new room.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingRequests;