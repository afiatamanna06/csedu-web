import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/contexts/auth-context';

const API_BASE_URL = 'http://localhost:8000';

interface LocationState {
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  capacity?: number;
}

interface Message {
  text: string;
  type: 'success' | 'error' | '';
}

const BookRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const state = location.state as LocationState;
  
  const [bookingPurpose, setBookingPurpose] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<Message>({ text: '', type: '' });

  // Convert date string to backend format (YYYY-MM-DD)
  const formatDateForBackend = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Convert time string to backend format (HH:MM:SS)
  const formatTimeForBackend = (timeString: string) => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    let hoursNum = parseInt(hours);
    
    if (period === 'PM' && hoursNum !== 12) {
      hoursNum += 12;
    } else if (period === 'AM' && hoursNum === 12) {
      hoursNum = 0;
    }
    
    return `${hoursNum.toString().padStart(2, '0')}:${minutes}:00`;
  };

  // Check if required data is available
  useEffect(() => {
    if (!state?.roomId || !state?.date || !state?.startTime || !state?.endTime) {
      navigate('/dashboard/faculty/room-availability');
    }
  }, [state, navigate]);

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

    if (!currentUser) {
      setMessage({ text: 'Authentication required. Please log in again.', type: 'error' });
      return;
    }

    try {
      setIsLoading(true);
      setMessage({ text: '', type: '' });

      const bookingData = {
        room_id: state.roomId,
        date: formatDateForBackend(state.date),
        start_time: formatTimeForBackend(state.startTime),
        end_time: formatTimeForBackend(state.endTime),
        booking_purpose: bookingPurpose.trim()
      };

      await axios.post(
        `${API_BASE_URL}/room/book`,
        bookingData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Navigate back to room availability with success message
      navigate('/dashboard/faculty/room-availability', { 
        state: { 
          bookingSuccess: true
        }
      });

    } catch (error: any) {
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

  if (!state) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#13274C] flex flex-col items-center">
      {/* Page Title */}
      <h1 className="text-[#FFC300] text-4xl font-bold mt-16 mb-8">Room Booking</h1>

      {/* Booking Card */}
      <div className="bg-white rounded-lg shadow-lg w-[700px] p-8">
        <h2 className="text-[#13274C] text-2xl font-semibold mb-8 text-center">
          Book Room {state.roomId}
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
              <div className="text-[#13274C] font-medium">{state.location}</div>
            </div>
            <div>
              <span className="text-gray-600">Capacity:</span>
              <div className="text-[#13274C] font-medium">{state.capacity} people</div>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="mb-6">
          <h3 className="text-gray-700 text-sm font-medium mb-2">Date</h3>
          <div className="bg-gray-50 rounded-md p-3 text-[#13274C]">
            {state.date}
          </div>
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-gray-700 text-sm font-medium mb-2">Start Time</h3>
            <div className="bg-gray-50 rounded-md p-3 text-[#13274C]">
              {state.startTime}
            </div>
          </div>
          <div>
            <h3 className="text-gray-700 text-sm font-medium mb-2">End Time</h3>
            <div className="bg-gray-50 rounded-md p-3 text-[#13274C]">
              {state.endTime}
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
            onClick={() => navigate('/dashboard/faculty/room-availability')}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-md font-medium transition-colors duration-300 hover:bg-gray-400"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleBookRoom}
            disabled={!bookingPurpose.trim() || isLoading}
            className={`flex-1 py-3 rounded-md font-medium transition-colors duration-300 ${
              !bookingPurpose.trim() || isLoading
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Booking...' : 'Book Room'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookRoom; 