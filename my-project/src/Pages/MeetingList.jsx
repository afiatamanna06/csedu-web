import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelectField from '../components/SelectField';

const MeetingList = () => {
  const navigate = useNavigate();
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMeetings, setIsLoadingMeetings] = useState(false);

  // Existing state
  const [selectedFaculty, setSelectedFaculty] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('All'); // ✅ Changed from 'This Week' to 'All'
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [dialogAction, setDialogAction] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [meetingToUpdate, setMeetingToUpdate] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [newMeeting, setNewMeeting] = useState({
    topic: '',
    date: '',
    time: '',
    host_name: '',
    location: ''
  });
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
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
      
      // Fetch all meetings first
      const response = await axios.get(`${API_BASE_URL}/meetings/filter`, {
        headers: getAuthHeaders()
      });

      setAllMeetings(response.data);
      // Apply client-side filtering
      applyFilters(response.data);
      
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

  // Apply filters to meetings
  const applyFilters = (meetingsData) => {
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
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)
          return meetingDate >= weekStart && meetingDate <= weekEnd;
        
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
    if (isAuthenticated) {
      fetchMeetings();
    }
  }, [isAuthenticated]);

  // Apply filters when filter criteria change
  useEffect(() => {
    if (allMeetings.length > 0) {
      applyFilters(allMeetings);
    }
  }, [selectedFaculty, selectedDateRange, allMeetings, customDateRange]);

  // Create meeting function
// Create meeting function
const handleCreateMeeting = async () => {
  if (!newMeeting.topic || !newMeeting.date || !newMeeting.time || !newMeeting.host_name || !newMeeting.location) {
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

    // Format time to include seconds if not present
    const formatTime = (time) => {
      if (!time) return '';
      // If time already has seconds (HH:MM:SS), return as is
      if (time.includes(':') && time.split(':').length === 3) {
        return time;
      }
      // If time is HH:MM format, add seconds
      return `${time}:00`;
    };

    const meetingData = {
      date: newMeeting.date,
      time: formatTime(newMeeting.time),
      topic: newMeeting.topic,
      host_name: newMeeting.host_name,
      location: newMeeting.location
    };

    console.log('Sending meeting data:', meetingData);

    const response = await axios.post(
      `${API_BASE_URL}/meetings/`,
      meetingData,
      {
        headers: getAuthHeaders()
      }
    );

    console.log('Meeting created successfully:', response.data);

    setMessage({ text: 'Meeting created successfully!', type: 'success' });
    setShowCreateDialog(false);
    
    // Reset form
    setNewMeeting({
      topic: '',
      date: '',
      time: '',
      host_name: '',
      location: ''
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
    } else if (error.response?.status === 422) {
      setMessage({ 
        text: 'Invalid data format. Please check your inputs.', 
        type: 'error' 
      });
    } else {
      setMessage({ 
        text: `Failed to create meeting: ${error.response?.data?.detail || error.message}`, 
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

    // Validate required fields
    if (!meetingToUpdate.topic || !meetingToUpdate.date || !meetingToUpdate.time || !meetingToUpdate.host_name || !meetingToUpdate.location) {
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

      // Format time to include seconds if not present
      const formatTime = (time) => {
        if (!time) return '';
        // If time already has seconds (HH:MM:SS), return as is
        if (time.includes(':') && time.split(':').length === 3) {
          return time;
        }
        // If time is HH:MM format, add seconds
        return `${time}:00`;
      };

      // Ensure all required fields are strings and properly formatted
      const updateData = {
        date: String(meetingToUpdate.date),
        time: formatTime(String(meetingToUpdate.time)),
        topic: String(meetingToUpdate.topic),
        host_name: String(meetingToUpdate.host_name),
        location: String(meetingToUpdate.location),
        status: String(meetingToUpdate.status || 'pending')
      };

      console.log('Sending update data:', updateData);
      console.log('Update URL:', `${API_BASE_URL}/meetings/${meetingToUpdate.id}`);

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
      console.error('Error response:', error.response?.data);
      
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
      } else if (error.response?.status === 422) {
        // More specific error handling for validation errors
        const errorDetail = error.response?.data?.detail;
        if (Array.isArray(errorDetail)) {
          const errorMessages = errorDetail.map(err => `${err.loc?.[1] || 'Field'}: ${err.msg}`).join(', ');
          setMessage({ 
            text: `Validation error: ${errorMessages}`, 
            type: 'error' 
          });
        } else {
          setMessage({ 
            text: `Invalid data format: ${errorDetail || 'Please check your inputs.'}`, 
            type: 'error' 
          });
        }
      } else {
        setMessage({ 
          text: `Failed to update meeting: ${error.response?.data?.detail || error.message}`, 
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
      setShowDeleteDialog(false);
      setMeetingToDelete(null);

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

  // Show delete confirmation dialog
  const showDeleteConfirmation = (meeting) => {
    setMeetingToDelete(meeting);
    setShowDeleteDialog(true);
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

  const handleEditMeeting = (meeting) => {
    // Format time for HTML time input (remove seconds if present)
    const formatTimeForInput = (time) => {
      if (!time) return '';
      // Extract HH:MM from HH:MM:SS or return as is if already HH:MM
      const timeStr = String(time);
      return timeStr.substring(0, 5);
    };

    // Map old status values to new API-compliant values
    const mapStatusToApi = (status) => {
      if (!status) return 'pending';
      switch (status.toLowerCase()) {
        case 'im joining':
          return 'approved';
        case 'not joining':
          return 'rejected';
        case 'pending':
        case 'approved':
        case 'rejected':
          return status;
        default:
          return 'pending';
      }
    };

    console.log('Editing meeting:', meeting); // Debug log

    setMeetingToUpdate({
      id: meeting.id,
      topic: meeting.topic || '',
      date: meeting.date || '',
      time: formatTimeForInput(meeting.time),
      host_name: meeting.host_name || '',
      location: meeting.location || '',
      status: mapStatusToApi(meeting.status)
    });
    setShowUpdateDialog(true);
    setShowActionMenu(null);
  };

  const handleDialogConfirm = () => {
    if (dialogAction === 'join') {
      setMeetings(prevMeetings =>
        prevMeetings.map(m =>
          m.id === selectedMeeting.id ? { ...m, status: 'approved' } : m
        )
      );
    } else if (dialogAction === 'notjoin') {
      setMeetings(prevMeetings =>
        prevMeetings.map(m =>
          m.id === selectedMeeting.id ? { ...m, status: 'rejected' } : m
        )
      );
    }
    setDialogOpen(false);
    setSelectedMeeting(null);
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'im joining':
        return 'bg-green-100 text-green-800';
      case 'rejected':
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
    dateRange: ['All', 'Today', 'This Week', 'This Month', 'Custom'] // ✅ Added 'All' as first option
  };

  // Filter meetings by creator (you'll need to add this field to your backend)
  // const userMeetings = meetings.filter(m => m.createdBy === 'currentUser'); // Update this logic based on your backend
  // const otherMeetings = meetings.filter(m => m.createdBy !== 'currentUser'); // Update this logic based on your backend

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
          {(meeting.status === 'pending' || !meeting.status) && (
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
          {(meeting.status === 'approved' || meeting.status === 'im joining') && (
            <button
              onClick={() => handleMeetingAction(meeting, 'notjoin')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Not joining
            </button>
          )}
          {(meeting.status === 'rejected' || meeting.status === 'not joining') && (
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FFC300]">
              <th className="text-left py-4 px-6 text-sm font-semibold text-[#13274C] border-r border-yellow-400">Date/Time</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-[#13274C] border-r border-yellow-400">Topic</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-[#13274C] border-r border-yellow-400">Host Name</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-[#13274C] border-r border-yellow-400">Location</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-[#13274C] border-r border-yellow-400">Status</th>
              {showActions && (
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#13274C]">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {!isLoadingMeetings && meetingList.length > 0 ? (
              meetingList.map((meeting, index) => (
                <tr 
                  key={meeting.id} 
                  className={`hover:bg-gray-50 transition-colors duration-150 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="py-4 px-6 text-sm text-[#13274C] font-medium border-r border-gray-100">
                    <div className="text-blue-600 font-medium">{meeting.date}</div>
                    <div className="text-gray-500 text-xs">{meeting.time}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-800 border-r border-gray-100">
                    <div className="font-medium">{meeting.topic}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-800 border-r border-gray-100">
                    <div className="font-medium">{meeting.host_name}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-800 border-r border-gray-100">
                    {meeting.is_online ? (
                      meeting.meeting_link ? (
                        <a 
                          href={meeting.meeting_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          🔗 Join Online Meeting
                        </a>
                      ) : (
                        <span className="text-green-600 font-medium">🌐 Online Meeting</span>
                      )
                    ) : (
                      <span className="text-gray-800">{meeting.location}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-100">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                        meeting.status || 'pending'
                      )}`}
                    >
                      {(() => {
                        const status = meeting.status || 'pending';
                        switch (status.toLowerCase()) {
                          case 'approved':
                            return '✅ Approved';
                          case 'rejected':
                            return '❌ Rejected';
                          case 'pending':
                            return '⏳ Pending';
                          case 'im joining':
                            return '👥 I\'m Joining';
                          case 'not joining':
                            return '❌ Not Joining';
                          default:
                            return status.charAt(0).toUpperCase() + status.slice(1);
                        }
                      })()}
                    </span>
                  </td>
                  {showActions && (
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEditMeeting(meeting)}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-150"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => showDeleteConfirmation(meeting)}
                          className="inline-flex items-center text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-150"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              !isLoadingMeetings && (
                <tr>
                  <td 
                    colSpan={showActions ? 6 : 5} 
                    className="py-12 px-6 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg font-medium text-gray-400">No meetings found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your filter criteria</p>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#13274C]">Meeting List</h1>
          <button
            onClick={() => setShowCreateDialog(true)}
            className="bg-[#13274C] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-200 font-medium shadow-lg"
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
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="w-[300px] xl:w-[400px] 2xl:w-[500px]">
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
              <div className="w-[300px] xl:w-[400px] 2xl:w-[500px]">
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
              
              {/* Custom Date Range Inputs */}
              {selectedDateRange === 'Custom' && (
                <div className="w-full flex justify-center gap-4 mt-4">
                  <div className="w-[200px]">
                    <div className="bg-[#FFC300] rounded-lg px-4 py-2">
                      <label className="block text-[#13274C] text-sm font-medium mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={customDateRange.startDate}
                        onChange={(e) => setCustomDateRange({ ...customDateRange, startDate: e.target.value })}
                        className="w-full bg-white rounded-md py-1 px-2 text-sm border-none focus:outline-none focus:ring-1 focus:ring-[#13274C]"
                      />
                    </div>
                  </div>
                  <div className="w-[200px]">
                    <div className="bg-[#FFC300] rounded-lg px-4 py-2">
                      <label className="block text-[#13274C] text-sm font-medium mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={customDateRange.endDate}
                        onChange={(e) => setCustomDateRange({ ...customDateRange, endDate: e.target.value })}
                        className="w-full bg-white rounded-md py-1 px-2 text-sm border-none focus:outline-none focus:ring-1 focus:ring-[#13274C]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Filter Results Summary */}
            <div className="mt-4 text-center">
              <span className="text-white text-sm">
                Showing {meetings.length} meeting{meetings.length !== 1 ? 's' : ''} 
                {selectedFaculty !== 'All' && ` by ${selectedFaculty}`}
                {selectedDateRange !== 'Custom' && ` for ${selectedDateRange.toLowerCase()}`}
                {selectedDateRange === 'Custom' && customDateRange.startDate && customDateRange.endDate && 
                  ` from ${customDateRange.startDate} to ${customDateRange.endDate}`}
              </span>
            </div>
          </div>

        {/* Meetings Table */}
        {renderMeetingTable(meetings)}
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

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newMeeting.location}
                  onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                  placeholder="Enter meeting location"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                />
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

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={meetingToUpdate.location || ''}
                  onChange={(e) => setMeetingToUpdate({ ...meetingToUpdate, location: e.target.value })}
                  placeholder="Enter meeting location"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={meetingToUpdate.status || 'pending'}
                  onChange={(e) => setMeetingToUpdate({ ...meetingToUpdate, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
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

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && meetingToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Meeting</h3>
              <p className="text-sm text-gray-600 mb-2">
                Are you sure you want to delete this meeting?
              </p>
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-sm font-medium text-gray-900">{meetingToDelete.topic}</p>
                <p className="text-xs text-gray-600">
                  {meetingToDelete.date} at {meetingToDelete.time} - Host: {meetingToDelete.host_name}
                </p>
              </div>
              <p className="text-xs text-red-600 mb-6">
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteDialog(false);
                  setMeetingToDelete(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-150"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteMeeting(meetingToDelete.id)}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-150 disabled:opacity-50"
              >
                {isLoading ? 'Deleting...' : 'Delete Meeting'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingList;