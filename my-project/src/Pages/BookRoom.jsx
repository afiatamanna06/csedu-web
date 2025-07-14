import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room_id, booking_date, start_time, end_time } = location.state || {};
  
  const [bookingPurpose, setBookingPurpose] = useState('');

  const handleBookRoom = () => {
    const bookingData = {
      room_id,
      booking_date,
      start_time,
      end_time,
      booking_purpose: bookingPurpose,
      user_id: "1" // This would come from auth context in a real app
    };
    
    // Navigate back with the booked room data to update availability
    navigate('/room-availability', { 
      state: { 
        bookedRoom: bookingData,
        isNewBooking: true
      }
    });
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
          <h3 className="text-gray-700 text-sm font-medium mb-2">Purpose of Booking</h3>
          <textarea
            value={bookingPurpose}
            onChange={(e) => setBookingPurpose(e.target.value)}
            placeholder="Enter the purpose of your booking"
            className="w-full p-3 bg-gray-50 rounded-md text-[#13274C] min-h-[100px] resize-none border focus:outline-none focus:ring-1 focus:ring-[#13274C] focus:border-transparent"
          />
        </div>

        {/* Book Button */}
        <button
          onClick={handleBookRoom}
          disabled={!bookingPurpose.trim()}
          className="w-full bg-[#FFC300] text-[#13274C] py-3 rounded-md font-medium transition-colors duration-300 hover:bg-[#e6b000] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white"
        >
          Book this room
        </button>
      </div>
    </div>
  );
};

export default BookRoom;
