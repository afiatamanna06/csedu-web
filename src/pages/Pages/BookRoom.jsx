import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room_id, booking_date, start_time, end_time, location: roomLocation, capacity } = location.state || {};
  
  const [bookingPurpose, setBookingPurpose] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

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

  // Check if required data is available
  useEffect(() => {
    if (!room_id || !booking_date || !start_time || !end_time) {
      navigate('/teacher/room-availability');
    }
  }, [room_id, booking_date, start_time, end_time, navigate]);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleBookRoom = async () => {
    if (!bookingPurpose.trim()) {
      setMessage({ text: 'Please enter the purpose of booking', type: 'error' });
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setMessage({ text: 'Authentication required. Please log in again.', type: 'error' });
      return;
    }

    try {
      setIsLoading(true);
      setMessage({ text: '', type: '' });

      const bookingData = {
        room_id: room_id,
        date: formatDateForBackend(booking_date),
        start_time: formatTimeForBackend(start_time),
        end_time: formatTimeForBackend(end_time),
        booking_purpose: bookingPurpose.trim()
      };

      console.log('Sending booking data:', bookingData);

      const response = await axios.post(
        `${API_BASE_URL}/room/book`,
        bookingData,
        {
          headers: getAuthHeaders()
        }
      );

      console.log('Booking response:', response.data);

      // Navigate back to room availability with success message
      navigate('/room-availability', { 
        state: { 
          bookingSuccess: true
        }
      });

    } catch (error) {
      console.error('Booking error:', error);
      
      if (error.response?.status === 401) {
        setMessage({ 
          text: 'Authentication failed. Please log in again.', 
          type: 'error' 
        });
      } else if (error.response?.status === 403) {
        setMessage({ 
          text: 'You do not have permission to book rooms.', 
          type: 'error' 
        });
      } else if (error.response?.status === 404) {
        setMessage({ 
          text: 'Room not found. Please try again.', 
          type: 'error' 
        });
      } else if (error.response?.status === 409) {
        setMessage({ 
          text: 'Room is already booked for this time slot. Please choose a different time.', 
          type: 'error' 
        });
      } else if (error.response?.status === 422) {
        const errorDetail = error.response?.data?.detail || 'Invalid booking data.';
        setMessage({ 
          text: `Validation error: ${errorDetail}`, 
          type: 'error' 
        });
      } else {
        setMessage({ 
          text: 'Failed to book room. Please try again.', 
          type: 'error' 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#13274C] flex flex-col items-center">
      {/* Page Title */}
      <h1 className="text-[#FFC300] text-4xl font-bold mt-16 mb-8">Room Booking</h1>

      {/* Booking Card */}
      <div className="bg-white rounded-lg shadow-lg w-[700px] p-8">
        <h2 className="text-[#13274C] text-2xl font-semibold mb-8 text-center">
          Book Room {room_id}
        </h2>

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

        {/* Room Details */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-[#13274C] text-lg font-semibold mb-2">Room Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Location:</span>
              <div className="text-[#13274C] font-medium">{roomLocation}</div>
            </div>
            <div>
              <span className="text-gray-600">Capacity:</span>
              <div className="text-[#13274C] font-medium">{capacity} people</div>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="mb-6">
          <h3 className="text-gray-700 text-sm font-medium mb-2">Date</h3>
          <div className="bg-gray-50 rounded-md p-3 text-[#13274C]">
            {booking_date}
          </div>
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-gray-700 text-sm font-medium mb-2">Start Time</h3>
            <div className="bg-gray-50 rounded-md p-3 text-[#13274C]">
              {start_time}
            </div>
          </div>
          <div>
            <h3 className="text-gray-700 text-sm font-medium mb-2">End Time</h3>
            <div className="bg-gray-50 rounded-md p-3 text-[#13274C]">
              {end_time}
            </div>
          </div>
        </div>

        {/* Purpose of Booking */}
        <div className="mb-6">
          <h3 className="text-gray-700 text-sm font-medium mb-2">
            Purpose of Booking <span className="text-red-500">*</span>
          </h3>
          <textarea
            value={bookingPurpose}
            onChange={(e) => setBookingPurpose(e.target.value)}
            placeholder="Enter the purpose of your booking (e.g., Class lecture, Group meeting, Exam, etc.)"
            className="w-full p-3 bg-gray-50 rounded-md text-[#13274C] min-h-[100px] resize-none border focus:outline-none focus:ring-2 focus:ring-[#13274C] focus:border-transparent"
            maxLength={500}
          />
          <div className="text-sm text-gray-500 mt-1">
            {bookingPurpose.length}/500 characters
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/room-availability')}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-md font-medium transition-colors duration-300 hover:bg-gray-400"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleBookRoom}
            disabled={!bookingPurpose.trim() || isLoading}
            className="flex-1 bg-[#FFC300] text-[#13274C] py-3 rounded-md font-medium transition-colors duration-300 hover:bg-[#e6b000] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#13274C]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Booking...
              </>
            ) : (
              'Book this room'
            )}
          </button>
        </div>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Booking Information:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Your booking request will be submitted for admin approval.</li>
                <li>You will be notified once your booking is approved or rejected.</li>
                <li>Please ensure you arrive on time for your booking.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRoom;