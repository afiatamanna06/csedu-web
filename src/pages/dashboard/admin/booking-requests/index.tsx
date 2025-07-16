import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/auth-context';

const API_BASE_URL = 'http://localhost:8000';

interface Room {
  id: string;
  room_id: string;
  location: string;
  capacity: number;
}

interface Booking {
  id: string;
  room: string;
  room_id: string;
  date: string;
  time: string;
  requester: string;
  purpose: string;
  courseCode: string;
  status: 'm' | 'accepted' | 'rejected';
}

interface NewRoom {
  room_id: string;
  location: string;
  capacity: string;
}

interface Message {
  text: string;
  type: 'success' | 'error' | '';
}

const BookingRequests = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([
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
    }
  ]);

  const [, setRooms] = useState<Room[]>([]);
  const [newRoom, setNewRoom] = useState<NewRoom>({
    room_id: '',
    location: '',
    capacity: ''
  });

  const [showAddRoom, setShowAddRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setIsLoadingRooms] = useState(false);
  const [message, setMessage] = useState<Message>({ text: '', type: '' });

  // Fetch all rooms from the API
  const fetchAllRooms = async () => {
    if (!currentUser) return;

    try {
      setIsLoadingRooms(true);
      const response = await axios.get<Room[]>(`${API_BASE_URL}/room/all`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      setRooms(response.data);
    } catch (error: any) {
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
    if (currentUser) {
      fetchAllRooms();
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRoom(prev => ({ ...prev, [name]: value }));
  };

  const addRoom = async () => {
    if (!newRoom.room_id || !newRoom.location || !newRoom.capacity) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }

    if (!currentUser) {
      setMessage({ text: 'Authentication required. Please log in again.', type: 'error' });
      return;
    }

    try {
      setIsLoading(true);
      setMessage({ text: '', type: '' });

      // const response = await axios.post(
      //   `${API_BASE_URL}/room/add`, 
      //   {
      //     room_id: newRoom.room_id,
      //     location: newRoom.location,
      //     capacity: parseInt(newRoom.capacity)
      //   }, 
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //       'Content-Type': 'application/json'
      //     }
      //   }
      // );

      setMessage({ text: 'Room added successfully!', type: 'success' });
      await fetchAllRooms();
      setNewRoom({ room_id: '', location: '', capacity: '' });
      setShowAddRoom(false);

    } catch (error: any) {
      console.error('Error adding room:', error);
      
      if (error.response?.status === 401) {
        setMessage({ 
          text: 'Authentication failed. Please log in again.', 
          type: 'error' 
        });
      } else if (error.response?.status === 403) {
        setMessage({ 
          text: 'You do not have permission to add rooms. Only admins can add rooms.', 
          type: 'error' 
        });
      } else if (error.response?.status === 400) {
        const errorDetail = error.response?.data?.detail || 'Room with this ID already exists.';
        setMessage({ 
          text: errorDetail, 
          type: 'error' 
        });
      } else if (error.response?.status === 422) {
        const errorDetail = error.response?.data?.detail || 'Invalid data provided.';
        setMessage({ 
          text: `Validation error: ${errorDetail}`, 
          type: 'error' 
        });
      } else {
        setMessage({ 
          text: 'Failed to add room. Please try again.', 
          type: 'error' 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (action: 'accept' | 'reject', booking: Booking) => {
    let newStatus: 'accepted' | 'rejected';
    let alertMessage: string;

    if (booking.status === 'm') {
      newStatus = action === 'accept' ? 'accepted' : 'rejected';
      alertMessage = action === 'accept' ? 'Booking accepted successfully!' : 'Booking rejected';
    } else if (booking.status === 'accepted' && action === 'reject') {
      newStatus = 'rejected';
      alertMessage = 'Booking changed to rejected';
    } else if (booking.status === 'rejected' && action === 'accept') {
      newStatus = 'accepted';
      alertMessage = 'Booking changed to accepted';
    } else {
      return; // No valid state change
    }

    try {
      await axios.put(
        `${API_BASE_URL}/booking/update/${booking.id}`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setBookings(prevBookings =>
        prevBookings.map(b =>
          b.id === booking.id ? { ...b, status: newStatus } : b
        )
      );

      setMessage({ text: alertMessage, type: 'success' });
    } catch (error: any) {
      console.error('Error updating booking:', error);
      setMessage({ 
        text: 'Failed to update booking status. Please try again.', 
        type: 'error' 
      });
    }
  };

  const getStatusStyle = (status: Booking['status']) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const isActionEnabled = (action: 'accept' | 'reject', status: Booking['status']) => {
    if (status === 'm') return true;
    if (status === 'accepted' && action === 'reject') return true;
    if (status === 'rejected' && action === 'accept') return true;
    return false;
  };

  const getButtonStyle = (action: 'accept' | 'reject', isEnabled: boolean) => {
    if (!isEnabled) return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    return action === 'accept'
      ? 'bg-green-600 hover:bg-green-700 text-white'
      : 'bg-red-600 hover:bg-red-700 text-white';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Room Booking Requests</h1>
          <button
            onClick={() => setShowAddRoom(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New Room
          </button>
        </div>

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

        {/* Add Room Modal */}
        {showAddRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-[500px]">
              <h2 className="text-2xl font-bold mb-6">Add New Room</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room ID
                  </label>
                  <input
                    type="text"
                    name="room_id"
                    value={newRoom.room_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., A101"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={newRoom.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., 1st Floor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={newRoom.capacity}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., 30"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setShowAddRoom(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={addRoom}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isLoading ? 'Adding...' : 'Add Room'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.requester}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.courseCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(booking.status)}`}>
                      {booking.status === 'm' ? 'Pending' : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAction('accept', booking)}
                        disabled={!isActionEnabled('accept', booking.status)}
                        className={`px-3 py-1 rounded text-sm ${getButtonStyle('accept', isActionEnabled('accept', booking.status))}`}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction('reject', booking)}
                        disabled={!isActionEnabled('reject', booking.status)}
                        className={`px-3 py-1 rounded text-sm ${getButtonStyle('reject', isActionEnabled('reject', booking.status))}`}
                      >
                        Reject
                      </button>
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