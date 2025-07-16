import { useState, useEffect } from 'react';
import axios from 'axios';
import { SelectField } from '@/components/ui/select-field';
import { useAuth } from '@/contexts/auth-context';

const API_BASE_URL = 'http://localhost:8000';

interface Meeting {
  id: string;
  topic: string;
  date: string;
  time: string;
  host_name: string;
  location: string;
  status: string;
}

interface NewMeeting {
  topic: string;
  date: string;
  time: string;
  host_name: string;
  location: string;
}

interface Message {
  text: string;
  type: 'success' | 'error' | '';
}

interface CustomDateRange {
  startDate: string;
  endDate: string;
}

const MeetingList = () => {
  //const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [isLoadingMeetings, setIsLoadingMeetings] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('This Week');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [meetingToUpdate, setMeetingToUpdate] = useState<Meeting | null>(null);
  const [message, setMessage] = useState<Message>({ text: '', type: '' });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState<Meeting | null>(null);
  const [newMeeting, setNewMeeting] = useState<NewMeeting>({
    topic: '',
    date: '',
    time: '',
    host_name: '',
    location: ''
  });
  const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({
    startDate: '',
    endDate: ''
  });

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [allMeetings, setAllMeetings] = useState<Meeting[]>([]);

  // Fetch meetings from backend
  const fetchMeetings = async () => {
    if (!currentUser) return;

    try {
      setIsLoadingMeetings(true);
      
      const response = await axios.get<Meeting[]>(`${API_BASE_URL}/meetings/filter`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      setAllMeetings(response.data);
      applyFilters(response.data);
      
    } catch (error: any) {
      console.error('Failed to fetch meetings:', error);
      if (error.response?.status === 401) {
        setMessage({ 
          text: 'Authentication failed. Please log in again.', 
          type: 'error' 
        });
      } else if (error.response?.status === 403) {
        setMessage({ 
          text: 'You do not have permission to view meetings.', 
          type: 'error' 
        });
      } else {
        setMessage({ 
          text: 'Failed to load meetings. Please try again.', 
          type: 'error' 
        });
      }
    } finally {
      setIsLoadingMeetings(false);
    }
  };

  // Apply filters to meetings
  const applyFilters = (meetingsData: Meeting[]) => {
    let filteredMeetings = [...meetingsData];

    // Filter by faculty/host name
    if (selectedFaculty !== 'All') {
      filteredMeetings = filteredMeetings.filter(meeting => 
        meeting.host_name && meeting.host_name.toLowerCase().includes(selectedFaculty.toLowerCase())
      );
    }

    // Filter by date range
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    filteredMeetings = filteredMeetings.filter(meeting => {
      if (!meeting.date) return false;
      
      const meetingDate = new Date(meeting.date);
      
      switch (selectedDateRange) {
        case 'Today':
          return meetingDate.toDateString() === today.toDateString();
        
        case 'This Week':
          { const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)
          return meetingDate >= weekStart && meetingDate <= weekEnd; }
        
        case 'This Month':
          return meetingDate.getMonth() === today.getMonth() && 
                 meetingDate.getFullYear() === today.getFullYear();
        
        case 'Custom':
          if (customDateRange.startDate && customDateRange.endDate) {
            const startDate = new Date(customDateRange.startDate);
            const endDate = new Date(customDateRange.endDate);
            return meetingDate >= startDate && meetingDate <= endDate;
          }
          return true;
        
        default:
          return true;
      }
    });

    setMeetings(filteredMeetings);
  };

  // Fetch meetings when authenticated
  useEffect(() => {
    if (currentUser) {
      fetchMeetings();
    }
  }, [currentUser]);

  // Apply filters when filter criteria change
  useEffect(() => {
    if (allMeetings.length > 0) {
      applyFilters(allMeetings);
    }
  }, [selectedFaculty, selectedDateRange, allMeetings, customDateRange]);

  const handleCreateMeeting = async () => {
    if (!newMeeting.topic || !newMeeting.date || !newMeeting.time || !newMeeting.host_name || !newMeeting.location) {
      setMessage({ text: 'Please fill in all required fields', type: 'error' });
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/meetings/create`,
        newMeeting,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage({ text: 'Meeting created successfully!', type: 'success' });
      setShowCreateDialog(false);
      setNewMeeting({
        topic: '',
        date: '',
        time: '',
        host_name: '',
        location: ''
      });
      fetchMeetings();
    } catch (error: any) {
      console.error('Error creating meeting:', error);
      setMessage({ 
        text: error.response?.data?.detail || 'Failed to create meeting', 
        type: 'error' 
      });
    }
  };

  const handleUpdateMeeting = async () => {
    if (!meetingToUpdate) return;

    try {
      await axios.put(
        `${API_BASE_URL}/meetings/update/${meetingToUpdate.id}`,
        meetingToUpdate,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage({ text: 'Meeting updated successfully!', type: 'success' });
      setShowUpdateDialog(false);
      setMeetingToUpdate(null);
      fetchMeetings();
    } catch (error: any) {
      console.error('Error updating meeting:', error);
      setMessage({ 
        text: error.response?.data?.detail || 'Failed to update meeting', 
        type: 'error' 
      });
    }
  };

  const handleDeleteMeeting = async () => {
    if (!meetingToDelete) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/meetings/delete/${meetingToDelete.id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage({ text: 'Meeting deleted successfully!', type: 'success' });
      setShowDeleteDialog(false);
      setMeetingToDelete(null);
      fetchMeetings();
    } catch (error: any) {
      console.error('Error deleting meeting:', error);
      setMessage({ 
        text: error.response?.data?.detail || 'Failed to delete meeting', 
        type: 'error' 
      });
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Meetings</h1>
          <button
            onClick={() => setShowCreateDialog(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Schedule New Meeting
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

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SelectField
              label="Faculty"
              value={selectedFaculty}
              options={[
                { label: 'All', value: 'All' },
                { label: 'Dr. John Doe', value: 'Dr. John Doe' },
                { label: 'Dr. Jane Smith', value: 'Dr. Jane Smith' }
              ]}
              onChange={(value) => setSelectedFaculty(value)}
            />

            <SelectField
              label="Date Range"
              value={selectedDateRange}
              options={[
                { label: 'Today', value: 'Today' },
                { label: 'This Week', value: 'This Week' },
                { label: 'This Month', value: 'This Month' },
                { label: 'Custom', value: 'Custom' }
              ]}
              onChange={(value) => setSelectedDateRange(value)}
            />

            {selectedDateRange === 'Custom' && (
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={customDateRange.startDate}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={customDateRange.endDate}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Meetings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Topic</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Host</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoadingMeetings ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">Loading meetings...</td>
                </tr>
              ) : meetings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">No meetings found</td>
                </tr>
              ) : (
                meetings.map((meeting) => (
                  <tr key={meeting.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{meeting.topic}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{meeting.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{meeting.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{meeting.host_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{meeting.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(meeting.status)}`}>
                        {meeting.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setMeetingToUpdate(meeting);
                            setShowUpdateDialog(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setMeetingToDelete(meeting);
                            setShowDeleteDialog(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Create Meeting Dialog */}
        {showCreateDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-[500px]">
              <h2 className="text-2xl font-bold mb-6">Schedule New Meeting</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={newMeeting.topic}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Host
                  </label>
                  <input
                    type="text"
                    value={newMeeting.host_name}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, host_name: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newMeeting.location}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setShowCreateDialog(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateMeeting}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Meeting Dialog */}
        {showUpdateDialog && meetingToUpdate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-[500px]">
              <h2 className="text-2xl font-bold mb-6">Update Meeting</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={meetingToUpdate.topic}
                    onChange={(e) => setMeetingToUpdate(prev => ({ ...prev!, topic: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={meetingToUpdate.date}
                    onChange={(e) => setMeetingToUpdate(prev => ({ ...prev!, date: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={meetingToUpdate.time}
                    onChange={(e) => setMeetingToUpdate(prev => ({ ...prev!, time: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Host
                  </label>
                  <input
                    type="text"
                    value={meetingToUpdate.host_name}
                    onChange={(e) => setMeetingToUpdate(prev => ({ ...prev!, host_name: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={meetingToUpdate.location}
                    onChange={(e) => setMeetingToUpdate(prev => ({ ...prev!, location: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowUpdateDialog(false);
                    setMeetingToUpdate(null);
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateMeeting}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update Meeting
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && meetingToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-[400px]">
              <h2 className="text-2xl font-bold mb-6">Delete Meeting</h2>
              <p className="mb-6">Are you sure you want to delete this meeting?</p>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteDialog(false);
                    setMeetingToDelete(null);
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteMeeting}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingList; 