import React, { useState, useMemo, useEffect } from "react";  // ✅ Combine all React imports
import { useNavigate, useLocation } from "react-router-dom";
import SelectField from "../components/SelectField";
import DateTimePicker from "../components/DateTimePicker";
import TimeSelect from "../components/TimeSelect";

const RoomAvailability = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // ✅ Authentication check - First useEffect
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
        // Check if user role is teacher
        if (decoded.role !== 'Teacher') {
          console.log('Access denied: User is not a teacher');
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
  const [selectedDate, setSelectedDate] = useState("12 Jun 2025");
  const [selectedStartTime, setSelectedStartTime] = useState("10:00 AM");
  const [selectedEndTime, setSelectedEndTime] = useState("12:00 PM");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCapacity, setSelectedCapacity] = useState("All");

  // Sample room data with bookings tracking
  const [roomData, setRoomData] = useState([
    {
      room_id: "A101",
      location: "Building A - Floor 1 - Room 101",
      capacity: 20,
      status: "available",
      bookings: []
    },
    {
      room_id: "A102",
      location: "Building A - Floor 1 - Room 102",
      capacity: 30,
      status: "unavailable",
      bookings: []
    },
    {
      room_id: "B201",
      location: "Building B - Floor 2 - Room 201",
      capacity: 25,
      status: "approved",
      bookings: []
    },
    {
      room_id: "B202",
      location: "Building B - Floor 2 - Room 202",
      capacity: 15,
      status: "rejected",
      bookings: []
    },
    {
      room_id: "C301",
      location: "Building C - Floor 3 - Room 301",
      capacity: 40,
      status: "available",
      bookings: []
    }
  ]);

  // Filter options
  const filterOptions = {
    location: [
      "Building A - Floor 1 - Room 101",
      "Building A - Floor 1 - Room 102",
      "Building B - Floor 2 - Room 201",
      "Building B - Floor 2 - Room 202",
      "Building C - Floor 3 - Room 301"
    ],
    capacity: ["15", "20", "25", "30", "40", "50", "60"]
  };

  // ✅ Check if a room was just booked - Second useEffect (fix the React.useEffect)
  useEffect(() => {  // ✅ Changed from React.useEffect to useEffect
    const { bookedRoom, isNewBooking } = location.state || {};
    if (bookedRoom && isNewBooking) {
      setRoomData(prevRooms => 
        prevRooms.map(room => 
          room.room_id === bookedRoom.room_id
            ? {
                ...room,
                status: 'pending',
                bookings: [...room.bookings, {
                  date: bookedRoom.booking_date,
                  start_time: bookedRoom.start_time,
                  end_time: bookedRoom.end_time,
                  purpose: bookedRoom.booking_purpose,
                  status: 'pending'
                }]
              }
            : room
        )
      );
      // Clear the booking state to prevent duplicate updates
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  // Function to update room status based on booking status
  const updateRoomStatus = (roomId, newStatus) => {
    setRoomData(prevRooms =>
      prevRooms.map(room =>
        room.room_id === roomId
          ? { ...room, status: newStatus }
          : room
      )
    );
  };

  // Function to check if a room is available for booking
  const isRoomAvailable = (room) => {
    return room.status === 'available' || room.status === 'rejected';
  };

  // Handle room booking
  const handleBookRoom = (room) => {
    if (!isRoomAvailable(room)) {
      alert('This room is not available for booking');
      return;
    }

    const bookingData = {
      room_id: room.room_id,
      booking_date: selectedDate,
      start_time: selectedStartTime,
      end_time: selectedEndTime,
      user_id: "1" // This would come from auth context in a real app
    };
    
    navigate('/book-room', { 
      state: bookingData
    });
  };

  // Get the appropriate button text based on room status
  const getActionButtonText = (status) => {
    switch (status) {
      case 'available':
        return 'Book this room';
      case 'pending':
        return 'Pending approval';
      case 'approved':
        return 'Currently booked';
      case 'rejected':
        return 'Book this room';
      case 'unavailable':
        return 'Not available';
      default:
        return 'Not available';
    }
  };

  // Get button styles based on room status
  const getActionButtonStyle = (status) => {
    if (status === 'available' || status === 'rejected') {
      return 'text-[#13274C] hover:text-white hover:bg-[#13274C] text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 ease-in-out border border-[#13274C]';
    }
    return 'text-sm text-gray-500';
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-[#13274C] text-white';
      case 'unavailable':
        return 'bg-gray-500 text-white';
      case 'approved':
        return 'bg-green-500 text-white';
      case 'rejected':
        return 'bg-red-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Filter rooms based on selected filters
  const filteredRooms = useMemo(() => {
    return roomData.filter(room => {
      if (selectedLocation !== "All" && room.location !== selectedLocation) return false;
      if (selectedCapacity !== "All" && room.capacity !== parseInt(selectedCapacity)) return false;
      return true;
    });
  }, [selectedLocation, selectedCapacity, roomData]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-lg text-gray-600">Loading...</div>
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
              Please login with a teacher account to access room availability.
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
                options={["All", ...filterOptions.location]}
                onChange={setSelectedLocation}
              />
            </div>

            {/* Capacity Filter */}
            <div className="z-20">
              <SelectField
                label="Capacity"
                value={selectedCapacity}
                options={["All", ...filterOptions.capacity]}
                onChange={setSelectedCapacity}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-6 text-sm text-gray-600 font-medium">{room.room_id}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 flex items-center justify-start">{room.location}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-center">{room.capacity}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(room.status)}`}>
                        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {isRoomAvailable(room) ? (
                        <button 
                          onClick={() => handleBookRoom(room)}
                          className={getActionButtonStyle(room.status)}
                        >
                          {getActionButtonText(room.status)}
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">
                          {getActionButtonText(room.status)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No rooms found matching the selected criteria.
                  </td>
                </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomAvailability;