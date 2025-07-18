import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SelectField from "../components/SelectField";
import DateTimePicker from "../components/DateTimePicker";
import TimeSelect from "../components/TimeSelect";

const RoomAvailability = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);

  // API base URL
  const API_BASE_URL = 'http://localhost:8000';

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

  // Function to decode JWT token
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Function to check if token is expired
  const isTokenExpired = (token) => {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  };

  // Convert date string to backend format (YYYY-MM-DD)
  const formatDateForBackend = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Convert time string to backend format (HH:MM:SS)
  const formatTimeForBackend = (timeString) => {
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
  };

  // Authentication check
  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.log('No token found');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        if (isTokenExpired(token)) {
          console.log('Token expired');
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        const decoded = decodeJWT(token);
        
        if (!decoded) {
          console.log('Invalid token');
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        console.log('Decoded token:', decoded);
        // Check if user role is teacher or admin
        if (!['Teacher', 'Admin'].includes(decoded.role)) {
          console.log('Access denied: User is not a teacher or admin');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        console.log('Authentication successful');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);
  
  // State for filter values
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  });
  const [selectedStartTime, setSelectedStartTime] = useState("10:00 AM");
  const [selectedEndTime, setSelectedEndTime] = useState("12:00 PM");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCapacity, setSelectedCapacity] = useState("All");

  // Room data state
  const [roomData, setRoomData] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Fetch filtered rooms from backend
  const fetchFilteredRooms = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      setIsLoadingRooms(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      
      // Always include date and time filters for availability check
      params.append('date_filter', formatDateForBackend(selectedDate));
      params.append('start_time_filter', formatTimeForBackend(selectedStartTime));
      params.append('end_time_filter', formatTimeForBackend(selectedEndTime));
      
      // Add status filter to only show available rooms
      params.append('status', 'available');
      
      if (selectedLocation !== "All") {
        params.append('location', selectedLocation);
      }
      
      if (selectedCapacity !== "All") {
        params.append('min_capacity', selectedCapacity);
      }

      const response = await axios.get(`${API_BASE_URL}/room/filter?${params.toString()}`, {
        headers: getAuthHeaders()
      });

      // Transform backend data to frontend format - only available rooms
      const transformedRooms = response.data
        .filter(room => room.status === 'available' || !room.status) // Filter for available rooms
        .map(room => ({
          room_id: room.id,
          location: room.location,
          capacity: room.capacity,
          status: 'available', // Ensure status is set to available
          bookings: []
        }));

      setRoomData(transformedRooms);
      
    } catch (error) {
      console.error('Failed to fetch filtered rooms:', error);
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
        setMessage({ 
          text: 'Failed to load available rooms. Please try again.', 
          type: 'error' 
        });
      }
    } finally {
      setIsLoadingRooms(false);
    }
  };

  // Fetch all rooms for location filter options
  const fetchAllRooms = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/room/all`, {
        headers: getAuthHeaders()
      });
      
      setAllRooms(response.data);
    } catch (error) {
      console.warn('Failed to fetch all rooms for filters:', error);
    }
  };

  // Fetch rooms when component mounts or filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllRooms();
      fetchFilteredRooms();
    }
  }, [isAuthenticated, selectedDate, selectedStartTime, selectedEndTime, selectedLocation, selectedCapacity]);

  // Handle successful booking response
  useEffect(() => {
    const { bookingSuccess } = location.state || {};
    if (bookingSuccess) {
      setMessage({ 
        text: 'Room booked successfully! Your booking is pending approval.', 
        type: 'success' 
      });
      
      // Refresh the rooms list
      fetchFilteredRooms();
      
      // Clear the state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle room booking
  const handleBookRoom = (room) => {
    const bookingData = {
      room_id: room.room_id,
      booking_date: selectedDate,
      start_time: selectedStartTime,
      end_time: selectedEndTime,
      location: room.location,
      capacity: room.capacity
    };
    
    navigate('/book-room', { 
      state: bookingData
    });
  };

  // Get unique locations from all rooms for filter
  const locationOptions = useMemo(() => {
    const uniqueLocations = [...new Set(allRooms.map(room => room.location))];
    return ["All", ...uniqueLocations];
  }, [allRooms]);

  // Get unique capacities from all rooms for filter
  const capacityOptions = useMemo(() => {
    const uniqueCapacities = [...new Set(allRooms.map(room => room.capacity))].sort((a, b) => a - b);
    return ["All", ...uniqueCapacities.map(cap => cap.toString())];
  }, [allRooms]);

  // Get the appropriate button text and styles
  const getActionButtonText = () => 'Book this room';
  
  const getActionButtonStyle = () => {
    return 'text-[#13274C] hover:text-white hover:bg-[#13274C] text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 ease-in-out border border-[#13274C]';
  };

  const getStatusStyle = () => 'bg-[#13274C] text-white';

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-96">
          <div className="flex items-center space-x-3">
            <svg className="animate-spin h-8 w-8 text-[#13274C]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show not authenticated message if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col justify-center items-center min-h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You are not authenticated or do not have permission to access this page.
            </p>
            <p className="text-gray-500 mb-8">
              Please login with a teacher or admin account to access room availability.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-[#13274C] text-white px-6 py-3 rounded-md hover:bg-[#1a3561] transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-full mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-4xl font-medium text-center mb-8">Room Availability</h1>

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

        {/* Filters Section */}
        <div className="bg-[#13274C] p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Date Filter */}
            <div className="z-40">
              <DateTimePicker
                label="Date"
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
            </div>

            {/* Time Filters */}
            <div className="md:col-span-2">
              <TimeSelect
                selectedStartTime={selectedStartTime}
                selectedEndTime={selectedEndTime}
                onStartTimeChange={setSelectedStartTime}
                onEndTimeChange={setSelectedEndTime}
              />
            </div>

            {/* Location Filter */}
            <div className="z-30">
              <SelectField
                label="Location"
                value={selectedLocation}
                options={locationOptions}
                onChange={setSelectedLocation}
              />
            </div>

            {/* Capacity Filter */}
            <div className="z-20">
              <SelectField
                label="Capacity"
                value={selectedCapacity}
                options={capacityOptions}
                onChange={setSelectedCapacity}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoadingRooms && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-800 font-medium">Loading available rooms...</span>
              </div>
            </div>
          )}

          <table className="w-full">
            <thead>
              <tr className="bg-[#FFC300]">
                <th className="text-left py-3 px-6 text-sm font-semibold w-1/6">Room ID</th>
                <th className="text-left py-3 px-6 text-sm font-semibold w-1/3">Location</th>
                <th className="text-center py-3 px-6 text-sm font-semibold w-1/6">Capacity</th>
                <th className="text-center py-3 px-6 text-sm font-semibold w-1/6">Availability</th>
                <th className="text-center py-3 px-6 text-sm font-semibold w-1/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoadingRooms && roomData.length > 0 ? (
                roomData.map((room, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-6 text-sm text-gray-600 font-medium">{room.room_id}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{room.location}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-center">{room.capacity}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle()}`}>
                        Available
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => handleBookRoom(room)}
                        className={getActionButtonStyle()}
                      >
                        {getActionButtonText()}
                      </button>
                    </td>
                  </tr>
                ))
              ) : !isLoadingRooms ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No available rooms found for the selected date and time.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomAvailability;