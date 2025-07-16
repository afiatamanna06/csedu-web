import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { SelectField } from "@/components/ui/select-field";
import { useAuth } from "@/contexts/auth-context";

const API_BASE_URL = 'http://localhost:8000';

interface Room {
  id: string;
  room_id: string;
  location: string;
  capacity: number;
  status: 'available' | 'booked' | 'pending';
  bookings: any[];
}

interface Message {
  text: string;
  type: 'success' | 'error' | '';
}

interface LocationState {
  bookingSuccess?: boolean;
}

const RoomAvailability = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  });
  const [selectedStartTime, setSelectedStartTime] = useState("10:00 AM");
  const [selectedEndTime, setSelectedEndTime] = useState("12:00 PM");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCapacity, setSelectedCapacity] = useState("All");
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [message, setMessage] = useState<Message>({ text: '', type: '' });

  // Convert date string to backend format (YYYY-MM-DD)
  const formatDateForBackend = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Convert time string to backend format (HH:MM:SS)
  const formatTimeForBackend = (timeString: string) => {
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    let hoursNum = parseInt(hours);
    
    if (period === 'PM' && hoursNum !== 12) {
      hoursNum += 12;
    } else if (period === 'AM' && hoursNum === 12) {
      hoursNum = 0;
    }
    
    return `${hoursNum.toString().padStart(2, '0')}:${minutes}:00`;
  };

  // Authentication check
  useEffect(() => {
    if (!currentUser || !['Teacher', 'Admin'].includes(currentUser.role)) {
      navigate("/login/faculty");
    }
  }, [currentUser, navigate]);

  // Fetch filtered rooms from backend
  const fetchFilteredRooms = async () => {
    if (!currentUser) return;

    try {
      setIsLoadingRooms(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      
      // Always include date and time filters for availability check
      params.append('date_filter', formatDateForBackend(selectedDate));
      params.append('start_time_filter', formatTimeForBackend(selectedStartTime));
      params.append('end_time_filter', formatTimeForBackend(selectedEndTime));
      
      if (selectedLocation !== "All") {
        params.append('location', selectedLocation);
      }
      
      if (selectedCapacity !== "All") {
        params.append('min_capacity', selectedCapacity);
      }

      const response = await axios.get<Room[]>(`${API_BASE_URL}/room/filter?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      // Transform backend data to frontend format
      const transformedRooms = response.data.map(room => ({
        ...room,
        status: 'available' as const,
        bookings: []
      }));

      setRoomData(transformedRooms);
      
    } catch (error: any) {
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
          text: 'Failed to load rooms. Please try again.', 
          type: 'error' 
        });
      }
    } finally {
      setIsLoadingRooms(false);
    }
  };

  // Fetch all rooms for location filter options
  const fetchAllRooms = async () => {
    if (!currentUser) return;

    try {
      const response = await axios.get<Room[]>(`${API_BASE_URL}/room/all`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      setAllRooms(response.data);
    } catch (error) {
      console.warn('Failed to fetch all rooms for filters:', error);
    }
  };

  // Fetch rooms when component mounts or filters change
  useEffect(() => {
    if (currentUser) {
      fetchAllRooms();
      fetchFilteredRooms();
    }
  }, [currentUser, selectedDate, selectedStartTime, selectedEndTime, selectedLocation, selectedCapacity]);

  // Handle successful booking response
  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.bookingSuccess) {
      setMessage({ 
        text: 'Room booked successfully! Your booking is pending approval.', 
        type: 'success' 
      });
      
      // Refresh the rooms list
      fetchFilteredRooms();
      
      // Clear the state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleBookRoom = (room: Room) => {
    navigate('/dashboard/faculty/book-room', {
      state: {
        roomId: room.id,
        date: selectedDate,
        startTime: selectedStartTime,
        endTime: selectedEndTime
      }
    });
  };

  const locationOptions = Array.from(new Set(allRooms.map(room => room.location)));
  const capacityOptions = ["All", "10", "20", "30", "40", "50"];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Room Availability</h1>

        {/* Message display */}
        {message.text && (
          <div
            className={`mb-4 p-4 rounded ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-[#13274C] p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 rounded border"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Start Time</label>
              <input
                type="time"
                value={selectedStartTime}
                onChange={(e) => setSelectedStartTime(e.target.value)}
                className="w-full p-2 rounded border"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">End Time</label>
              <input
                type="time"
                value={selectedEndTime}
                onChange={(e) => setSelectedEndTime(e.target.value)}
                className="w-full p-2 rounded border"
              />
            </div>

            <SelectField
              label="Location"
              value={selectedLocation}
              options={["All", ...locationOptions].map(loc => ({
                label: loc,
                value: loc
              }))}
              onChange={(value) => setSelectedLocation(value)}
            />

            <SelectField
              label="Minimum Capacity"
              value={selectedCapacity}
              options={capacityOptions.map(cap => ({
                label: cap,
                value: cap
              }))}
              onChange={(value) => setSelectedCapacity(value)}
            />
          </div>
        </div>

        {/* Room List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoadingRooms ? (
            <div className="col-span-full text-center py-8">Loading rooms...</div>
          ) : roomData.length > 0 ? (
            roomData.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Room {room.room_id}</h3>
                    <p className="text-gray-600">{room.location}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Available
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">Capacity: {room.capacity} people</p>
                </div>
                <button
                  onClick={() => handleBookRoom(room)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                  Book Room
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No rooms available for the selected criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomAvailability; 