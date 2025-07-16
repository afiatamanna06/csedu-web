import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelectField from '../components/SelectField';
import Sidebar from '../components/Sidebar';

const MeetingList = () => {
  const navigate = useNavigate();
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMeetings, setIsLoadingMeetings] = useState(false);

  // Existing state
  const [selectedFaculty, setSelectedFaculty] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('This Week');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [dialogAction, setDialogAction] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [meetingToUpdate, setMeetingToUpdate] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [newMeeting, setNewMeeting] = useState({
    topic: '',
    date: '',
    time: '',
    host_name: '',
    location: '',
    is_online: false,
    meeting_link: ''
  });

  // API configuration
  const API_BASE_URL = 'http://localhost:8000';

  // Authentication functions
  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };

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

  const isTokenExpired = (token) => {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
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

  // Meeting data state
  const [meetings, setMeetings] = useState([]);
  const [allMeetings, setAllMeetings] = useState([]);

  // Fetch meetings from backend
  const fetchMeetings = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      setIsLoadingMeetings(true);
      
      // Build query parameters for filtering
      const params = new URLSearchParams();
      
      if (selectedFaculty !== 'All') {
        params.append('host_name', selectedFaculty);
      }
      
      // You can add more filters based on selectedDateRange if needed
      
      const response = await axios.get(`${API_BASE_URL}/meetings/filter?${params.toString()}`, {
        headers: getAuthHeaders()
      });

      setAllMeetings(response.data);
      setMeetings(response.data);
      
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
      if (error.response?.status === 401) {
        setMessage({ 
          text: 'Authentication failed. Please log in again.', 
          type: 'error' 
        });
        setIsAuthenticated(false);
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

  // Fetch meetings when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchMeetings();
    }
  }, [isAuthenticated, selectedFaculty]);

  // Create meeting function
// Create meeting function
const handleCreateMeeting = async () => {
  if (!newMeeting.topic || !newMeeting.date || !newMeeting.time || !newMeeting.host_name) {
    setMessage({ text: 'Please fill in all required fields', type: 'error' });
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

    const meetingData = {
      topic: newMeeting.topic,
      date: newMeeting.date,
      time: newMeeting.time,
      host_name: newMeeting.host_name,
      location: newMeeting.is_online ? newMeeting.meeting_link : newMeeting.location,
      is_online: newMeeting.is_online,
      meeting_link: newMeeting.is_online ? newMeeting.meeting_link : null
    };

    const response = await axios.post(
      `${API_BASE_URL}/meetings/`,
      meetingData,
      {
        headers: getAuthHeaders()
      }
    );

    // Log the response to see the structure
    console.log('Meeting created successfully:', response.data);

    // The response.data should contain the newly created meeting with its ID
    const createdMeeting = response.data;

    setMessage({ text: 'Meeting created successfully!', type: 'success' });
    setShowCreateDialog(false);
    
    // Reset form
    setNewMeeting({
      topic: '',
      date: '',
      time: '',
      host_name: '',
      location: '',
      is_online: false,
      meeting_link: ''
    });

    // Refresh meetings list to include the new meeting
    fetchMeetings();

  } catch (error) {
    console.error('Error creating meeting:', error);
    
    if (error.response?.status === 401) {
      setMessage({ 
        text: 'Authentication failed. Please log in again.', 
        type: 'error' 
      });
      setIsAuthenticated(false);
    } else if (error.response?.status === 403) {
      setMessage({ 
        text: 'You do not have permission to create meetings.', 
        type: 'error' 
      });
    } else {
      setMessage({ 
        text: 'Failed to create meeting. Please try again.', 
        type: 'error' 
      });
    }
  } finally {
    setIsLoading(false);
  }
};

  // Update meeting function
  const handleUpdateMeeting = async () => {
    if (!meetingToUpdate) return;

    const token = getAuthToken();
    if (!token) {
      setMessage({ text: 'Authentication required. Please log in again.', type: 'error' });
      return;
    }

    try {
      setIsLoading(true);
      setMessage({ text: '', type: '' });

      const updateData = {
        topic: meetingToUpdate.topic,
        date: meetingToUpdate.date,
        time: meetingToUpdate.time,
        host_name: meetingToUpdate.host_name,
        location: meetingToUpdate.is_online ? meetingToUpdate.meeting_link : meetingToUpdate.location,
        is_online: meetingToUpdate.is_online,
        meeting_link: meetingToUpdate.is_online ? meetingToUpdate.meeting_link : null
      };

      await axios.put(
        `${API_BASE_URL}/meetings/${meetingToUpdate.id}`,
        updateData,
        {
          headers: getAuthHeaders()
        }
      );

      setMessage({ text: 'Meeting updated successfully!', type: 'success' });
      setShowUpdateDialog(false);
      setMeetingToUpdate(null);

      // Refresh meetings list
      fetchMeetings();

    } catch (error) {
      console.error('Error updating meeting:', error);
      
      if (error.response?.status === 401) {
        setMessage({ 
          text: 'Authentication failed. Please log in again.', 
          type: 'error' 
        });
        setIsAuthenticated(false);
      } else if (error.response?.status === 403) {
        setMessage({ 
          text: 'You do not have permission to update meetings.', 
          type: 'error' 
        });
      } else if (error.response?.status === 404) {
        setMessage({ 
          text: 'Meeting not found.', 
          type: 'error' 
        });
      } else {
        setMessage({ 
          text: 'Failed to update meeting. Please try again.', 
          type: 'error' 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Delete meeting function
  const handleDeleteMeeting = async (meetingId) => {
    const token = getAuthToken();
    if (!token) {
      setMessage({ text: 'Authentication required. Please log in again.', type: 'error' });
      return;
    }

    if (!window.confirm('Are you sure you want to delete this meeting?')) {
      return;
    }

    try {
      setIsLoading(true);
      setMessage({ text: '', type: '' });

      await axios.delete(
        `${API_BASE_URL}/meetings/${meetingId}`,
        {
          headers: getAuthHeaders()
        }
      );

      setMessage({ text: 'Meeting deleted successfully!', type: 'success' });

      // Refresh meetings list
      fetchMeetings();

    } catch (error) {
      console.error('Error deleting meeting:', error);
      
      if (error.response?.status === 401) {
        setMessage({ 
          text: 'Authentication failed. Please log in again.', 
          type: 'error' 
        });
        setIsAuthenticated(false);
      } else if (error.response?.status === 403) {
        setMessage({ 
          text: 'You do not have permission to delete meetings.', 
          type: 'error' 
        });
      } else if (error.response?.status === 404) {
        setMessage({ 
          text: 'Meeting not found.', 
          type: 'error' 
        });
      } else {
        setMessage({ 
          text: 'Failed to delete meeting. Please try again.', 
          type: 'error' 
        });
      }
    } finally {
      setIsLoading(false);
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

  // Existing functions for dialog handling
  const handleMeetingAction = (meeting, action) => {
    setSelectedMeeting(meeting);
    setDialogAction(action);
    setDialogOpen(true);
    setShowActionMenu(null);
  };

  const handleDialogConfirm = () => {
    if (dialogAction === 'join') {
      setMeetings(prevMeetings =>
        prevMeetings.map(m =>
          m.id === selectedMeeting.id ? { ...m, status: 'im joining' } : m
        )
      );
    } else if (dialogAction === 'notjoin') {
      setMeetings(prevMeetings =>
        prevMeetings.map(m =>
          m.id === selectedMeeting.id ? { ...m, status: 'not joining' } : m
        )
      );
    }
    setDialogOpen(false);
    setSelectedMeeting(null);
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'im joining':
        return 'bg-green-100 text-green-800';
      case 'not joining':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get unique host names for filter
  const filterOptions = {
    faculty: ['All', ...new Set(allMeetings.map(m => m.host_name))],
    dateRange: ['Today', 'This Week', 'This Month', 'Custom']
  };

  // Filter meetings by creator (you'll need to add this field to your backend)
  const userMeetings = meetings.filter(m => m.createdBy === 'currentUser'); // Update this logic based on your backend
  const otherMeetings = meetings.filter(m => m.createdBy !== 'currentUser'); // Update this logic based on your backend

  const renderActionMenu = (meeting) => {
    if (showActionMenu !== meeting.id) return null;
    
    return (
      <div 
        ref={actionMenuRef}
        style={{ 
          zIndex: 99999,
          top: '100%',
          right: 0,
          marginTop: '0.5rem'
        }}
        className="absolute w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      >
        <div className="py-1" role="menu">
          {meeting.status === 'pending' && (
            <>
              <button
                onClick={() => handleMeetingAction(meeting, 'join')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                I'm joining
              </button>
              <button
                onClick={() => handleMeetingAction(meeting, 'notjoin')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Not joining
              </button>
            </>
          )}
          {meeting.status === 'im joining' && (
            <button
              onClick={() => handleMeetingAction(meeting, 'notjoin')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Not joining
            </button>
          )}
          {meeting.status === 'not joining' && (
            <button
              onClick={() => handleMeetingAction(meeting, 'join')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              I'm joining
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderMeetingTable = (meetingList, showActions = true) => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {isLoadingMeetings && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-blue-800 font-medium">Loading meetings...</span>
          </div>
        </div>
      )}

      <table className="w-full">
        <thead>
          <tr className="bg-[#FFC300]">
            <th className="text-left py-3 px-6 text-sm font-semibold">Date/Time</th>
            <th className="text-left py-3 px-6 text-sm font-semibold">Topic</th>
            <th className="text-left py-3 px-6 text-sm font-semibold">Host Name</th>
            <th className="text-left py-3 px-6 text-sm font-semibold">Location</th>
            <th className="text-left py-3 px-6 text-sm font-semibold">Status</th>
            {showActions && (
              <th className="text-left py-3 px-6 text-sm font-semibold">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {!isLoadingMeetings && meetingList.length > 0 ? (
            meetingList.map((meeting) => (
              <tr key={meeting.id} className="border-b border-gray-100">
                <td className="py-3 px-6 text-sm text-gray-600">
                  {meeting.date} {meeting.time}
                </td>
                <td className="py-3 px-6 text-sm text-gray-600">{meeting.topic}</td>
                <td className="py-3 px-6 text-sm text-gray-600">{meeting.host_name}</td>
                <td className="py-3 px-6 text-sm text-gray-600">
                  {meeting.is_online ? (
                    meeting.meeting_link ? (
                      <a 
                        href={meeting.meeting_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Join Online Meeting
                      </a>
                    ) : (
                      'Online Meeting'
                    )
                  ) : (
                    meeting.location
                  )}
                </td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
                      meeting.status || 'pending'
                    )}`}
                  >
                    {(meeting.status || 'pending').charAt(0).toUpperCase() + (meeting.status || 'pending').slice(1)}
                  </span>
                </td>
                {showActions && (
                  <td className="py-3 px-6 relative">
                    <div className="relative">
                      <button
                        onClick={() => setShowActionMenu(showActionMenu === meeting.id ? null : meeting.id)}
                        className="text-gray-600 hover:text-gray-800 text-xl font-bold"
                      >
                        ⋮
                      </button>
                      {renderActionMenu(meeting)}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : !isLoadingMeetings ? (
            <tr>
              <td colSpan={showActions ? "6" : "5"} className="py-8 text-center text-gray-500">
                No meetings found.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );

  const actionMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setShowActionMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              Please login with a teacher or admin account to access meetings.
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
    <div className="flex min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Meeting List</h1>
            <button
              onClick={() => setShowCreateDialog(true)}
              className="bg-[#13274C] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
            >
              Create Meeting
            </button>
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

          {/* Filters Section */}
          <div className="bg-[#13274C] rounded-lg p-6 mb-8">
            <div className="flex justify-center gap-6">
              <div className="w-[400px] xl:w-[500px] 2xl:w-[600px]">
                <div className="bg-[#FFC300] rounded-lg px-4 py-2">
                  <label className="block text-[#13274C] text-sm font-medium mb-1">
                    Host Name
                  </label>
                  <select
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    className="w-full bg-white rounded-md py-1 px-2 text-sm border-none focus:outline-none focus:ring-1 focus:ring-[#13274C]"
                  >
                    {filterOptions.faculty.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-[400px] xl:w-[500px] 2xl:w-[600px]">
                <div className="bg-[#FFC300] rounded-lg px-4 py-2">
                  <label className="block text-[#13274C] text-sm font-medium mb-1">
                    Date Range
                  </label>
                  <select
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                    className="w-full bg-white rounded-md py-1 px-2 text-sm border-none focus:outline-none focus:ring-1 focus:ring-[#13274C]"
                  >
                    {filterOptions.dateRange.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex mb-6">
            <button
              className={`flex-1 py-3 px-6 text-center rounded-tl-lg rounded-bl-lg ${
                activeTab === 'upcoming'
                  ? 'bg-[#13274C] text-white'
                  : 'bg-[#FFC300] text-[#13274C]'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`flex-1 py-3 px-6 text-center rounded-tr-lg rounded-br-lg ${
                activeTab === 'archived'
                  ? 'bg-[#13274C] text-white'
                  : 'bg-[#FFC300] text-[#13274C]'
              }`}
              onClick={() => setActiveTab('archived')}
            >
              Archived
            </button>
          </div>

          {/* Meetings Table */}
          {renderMeetingTable(meetings)}

          {/* User Created Meetings */}
          {userMeetings.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Created Meetings</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#FFC300]">
                      <th className="text-left py-3 px-6 text-sm font-semibold">Date/Time</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold">Topic</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold">Host Name</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold">Location</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold">Status</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userMeetings.map((meeting) => (
                      <tr key={meeting.id} className="border-b border-gray-100">
                        <td className="py-3 px-6 text-sm text-gray-600">
                          {meeting.date} {meeting.time}
                        </td>
                        <td className="py-3 px-6 text-sm text-gray-600">{meeting.topic}</td>
                        <td className="py-3 px-6 text-sm text-gray-600">{meeting.host_name}</td>
                        <td className="py-3 px-6 text-sm text-gray-600">
                          {meeting.is_online ? 'Online Meeting' : meeting.location}
                        </td>
                        <td className="py-3 px-6">
                          <span
                            className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
                              meeting.status || 'pending'
                            )}`}
                          >
                            {(meeting.status || 'pending').charAt(0).toUpperCase() + (meeting.status || 'pending').slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-6 space-x-2">
                          <button
                            onClick={() => {
                              setMeetingToUpdate({ ...meeting });
                              setShowUpdateDialog(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 mr-2"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteMeeting(meeting.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Existing dialogs remain the same... */}
      {/* Action Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {dialogAction === 'join' ? 'Confirm Joining' : 'Confirm Not Joining'}
            </h2>
            <p className="mb-4">
              Are you sure you want to {dialogAction === 'join' ? 'join' : 'not join'} this meeting with {selectedMeeting?.host_name}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDialogConfirm}
                className={`px-4 py-2 text-white rounded ${
                  dialogAction === 'join' 
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Meeting Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-[#13274C] mb-6 text-center">Create New Meeting</h2>
            <div className="space-y-6">
              {/* Date and Time Group */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                  />
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
                <input
                  type="text"
                  value={newMeeting.topic}
                  onChange={(e) => setNewMeeting({ ...newMeeting, topic: e.target.value })}
                  placeholder="Enter meeting topic"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                />
              </div>

              {/* Host Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Host Name</label>
                <input
                  type="text"
                  value={newMeeting.host_name}
                  onChange={(e) => setNewMeeting({ ...newMeeting, host_name: e.target.value })}
                  placeholder="Enter host name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                />
              </div>

              {/* Location Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location Type</label>
                  <select
                    value={newMeeting.is_online}
                    onChange={(e) => {
                      const isOnline = e.target.value === 'true';
                      setNewMeeting({
                        ...newMeeting,
                        is_online: isOnline,
                        location: '',
                        meeting_link: ''
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm bg-white"
                  >
                    <option value="false">In-Person</option>
                    <option value="true">Online</option>
                  </select>
                </div>

                {newMeeting.is_online ? (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Link</label>
                    <input
                      type="text"
                      value={newMeeting.meeting_link}
                      onChange={(e) => setNewMeeting({ ...newMeeting, meeting_link: e.target.value })}
                      placeholder="Enter meeting link (e.g., https://meet.google.com/...)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Room Number</label>
                    <input
                      type="text"
                      value={newMeeting.location}
                      onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                      placeholder="Enter room number (e.g., Room 301)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setShowCreateDialog(false)}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMeeting}
                disabled={isLoading}
                className="px-6 py-2.5 bg-[#13274C] text-white text-sm font-medium rounded-lg hover:bg-opacity-90 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13274C] disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Meeting'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Meeting Dialog */}
      {showUpdateDialog && meetingToUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-[#13274C] mb-6 text-center">Update Meeting</h2>
            <div className="space-y-6">
              {/* Date and Time Group */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={meetingToUpdate.date}
                    onChange={(e) => setMeetingToUpdate({ ...meetingToUpdate, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={meetingToUpdate.time}
                    onChange={(e) => setMeetingToUpdate({ ...meetingToUpdate, time: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                  />
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
                <input
                  type="text"
                  value={meetingToUpdate.topic}
                  onChange={(e) => setMeetingToUpdate({ ...meetingToUpdate, topic: e.target.value })}
                  placeholder="Enter meeting topic"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                />
              </div>

              {/* Host Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Host Name</label>
                <input
                  type="text"
                  value={meetingToUpdate.host_name}
                  onChange={(e) => setMeetingToUpdate({ ...meetingToUpdate, host_name: e.target.value })}
                  placeholder="Enter host name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                />
              </div>

              {/* Location Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location Type</label>
                  <select
                    value={meetingToUpdate.is_online}
                    onChange={(e) => {
                      const isOnline = e.target.value === 'true';
                      setMeetingToUpdate({
                        ...meetingToUpdate,
                        is_online: isOnline,
                        location: isOnline ? meetingToUpdate.location : '',
                        meeting_link: isOnline ? meetingToUpdate.meeting_link : ''
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm bg-white"
                  >
                    <option value="false">In-Person</option>
                    <option value="true">Online</option>
                  </select>
                </div>

                {meetingToUpdate.is_online ? (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Link</label>
                    <input
                      type="text"
                      value={meetingToUpdate.meeting_link || ''}
                      onChange={(e) => setMeetingToUpdate({ ...meetingToUpdate, meeting_link: e.target.value })}
                      placeholder="Enter meeting link (e.g., https://meet.google.com/...)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Room Number</label>
                    <input
                      type="text"
                      value={meetingToUpdate.location || ''}
                      onChange={(e) => setMeetingToUpdate({ ...meetingToUpdate, location: e.target.value })}
                      placeholder="Enter room number (e.g., Room 301)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setShowUpdateDialog(false)}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateMeeting}
                disabled={isLoading}
                className="px-6 py-2.5 bg-[#13274C] text-white text-sm font-medium rounded-lg hover:bg-opacity-90 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13274C] disabled:opacity-50"
              >
                {isLoading ? 'Updating...' : 'Update Meeting'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingList;