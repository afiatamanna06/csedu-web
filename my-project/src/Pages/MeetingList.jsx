import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SelectField from '../components/SelectField';
import Sidebar from '../components/Sidebar';

const MeetingList = () => {
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
  const [newMeeting, setNewMeeting] = useState({
    topic: '',
    date: '',
    time: '',
    host_name: '',
    isOnline: false,
    location: {
      isOnline: false,
      room: '',
      meetingLink: ''
    }
  });

  // Sample meeting data with creator information
  const [meetings, setMeetings] = useState([
    {
      id: 'M1',
      date: '2024-03-15',
      time: '10:00 AM',
      topic: 'Project Discussion',
      host_name: 'Dr. Rahman',
      status: 'pending',
      createdBy: 'user123',
      location: {
        isOnline: false,
        room: 'Room 301'
      }
    },
    {
      id: 'M2',
      date: '2024-03-16',
      time: '02:00 PM',
      topic: 'Course Advising',
      host_name: 'Prof. Khan',
      status: 'pending',
      createdBy: 'user456',
      location: {
        isOnline: true,
        meetingLink: 'https://meet.google.com/abc-defg-hij'
      }
    }
  ]);

  // Filter options
  const filterOptions = {
    faculty: ['All', 'Dr. Rahman', 'Prof. Khan', 'Dr. Islam', 'Mr. Ahmed'],
    dateRange: ['Today', 'This Week', 'This Month', 'Custom']
  };

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

  const handleCreateMeeting = () => {
    const newMeetingId = `M${meetings.length + 1}`;
    const createdMeeting = {
      ...newMeeting,
      id: newMeetingId,
      status: 'pending',
      createdBy: 'currentUser', // Replace with actual user ID
      location: {
        isOnline: newMeeting.isOnline,
        room: newMeeting.isOnline ? '' : newMeeting.location.room,
        meetingLink: newMeeting.isOnline ? newMeeting.location.meetingLink : ''
      }
    };
    setMeetings([...meetings, createdMeeting]);
    setShowCreateDialog(false);
    setNewMeeting({
      topic: '',
      date: '',
      time: '',
      host_name: '',
      isOnline: false,
      location: {
        isOnline: false,
        room: '',
        meetingLink: ''
      }
    });
  };

  const handleUpdateMeeting = () => {
    setMeetings(prevMeetings =>
      prevMeetings.map(m =>
        m.id === meetingToUpdate.id ? { ...meetingToUpdate } : m
      )
    );
    setShowUpdateDialog(false);
    setMeetingToUpdate(null);
  };

  const handleDeleteMeeting = (meetingId) => {
    setMeetings(prevMeetings => prevMeetings.filter(m => m.id !== meetingId));
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
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

  // Filter meetings by creator
  const userMeetings = meetings.filter(m => m.createdBy === 'currentUser');
  const otherMeetings = meetings.filter(m => m.createdBy !== 'currentUser');

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

  // Update the table cell to show meeting link for online meetings
  const renderMeetingTable = (meetingList, showActions = true) => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
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
          {meetingList.map((meeting) => (
            <tr key={meeting.id} className="border-b border-gray-100">
              <td className="py-3 px-6 text-sm text-gray-600">
                {meeting.date} {meeting.time}
              </td>
              <td className="py-3 px-6 text-sm text-gray-600">{meeting.topic}</td>
              <td className="py-3 px-6 text-sm text-gray-600">{meeting.host_name}</td>
              <td className="py-3 px-6 text-sm text-gray-600">
                {meeting.location.isOnline ? (
                  meeting.status === 'confirmed' ? (
                    <a 
                      href={meeting.location.meetingLink} 
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
                  meeting.location.room
                )}
              </td>
              <td className="py-3 px-6">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
                    meeting.status
                  )}`}
                >
                  {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
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
          ))}
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

          {/* Other Meetings */}
          {renderMeetingTable(otherMeetings)}

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
                          {meeting.location.isOnline ? 'Online Meeting' : meeting.location.room}
                        </td>
                        <td className="py-3 px-6">
                          <span
                            className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
                              meeting.status
                            )}`}
                          >
                            {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
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
                <select
                  value={newMeeting.host_name}
                  onChange={(e) => setNewMeeting({ ...newMeeting, host_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm bg-white"
                >
                  <option value="">Select Host</option>
                  {filterOptions.faculty.filter(f => f !== 'All').map((faculty) => (
                    <option key={faculty} value={faculty}>
                      {faculty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location Type</label>
                  <select
                    value={newMeeting.isOnline}
                    onChange={(e) => {
                      const isOnline = e.target.value === 'true';
                      setNewMeeting({
                        ...newMeeting,
                        isOnline,
                        location: {
                          isOnline,
                          room: '',
                          meetingLink: ''
                        }
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm bg-white"
                  >
                    <option value="false">In-Person</option>
                    <option value="true">Online</option>
                  </select>
                </div>

                {newMeeting.isOnline ? (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Link</label>
                    <input
                      type="text"
                      value={newMeeting.location.meetingLink}
                      onChange={(e) =>
                        setNewMeeting({
                          ...newMeeting,
                          location: { ...newMeeting.location, meetingLink: e.target.value }
                        })
                      }
                      placeholder="Enter meeting link (e.g., https://meet.google.com/...)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Room Number</label>
                    <input
                      type="text"
                      value={newMeeting.location.room}
                      onChange={(e) =>
                        setNewMeeting({
                          ...newMeeting,
                          location: { ...newMeeting.location, room: e.target.value }
                        })
                      }
                      placeholder="Enter room number (e.g., Room 301)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#13274C] focus:ring-1 focus:ring-[#13274C] transition duration-150 text-gray-900 text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Status - Always starts as pending */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <div className="px-4 py-2.5 rounded-lg bg-yellow-50 text-yellow-800 text-sm">
                  Pending (Waiting for your response)
                </div>
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
                className="px-6 py-2.5 bg-[#13274C] text-white text-sm font-medium rounded-lg hover:bg-opacity-90 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13274C]"
              >
                Create Meeting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Meeting Dialog */}
      {showUpdateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Update Meeting</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Topic</label>
                <input
                  type="text"
                  value={meetingToUpdate.topic}
                  onChange={(e) => setMeetingToUpdate({ ...meetingToUpdate, topic: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={meetingToUpdate.date}
                  onChange={(e) => setMeetingToUpdate({ ...meetingToUpdate, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={meetingToUpdate.time}
                  onChange={(e) => setMeetingToUpdate({ ...meetingToUpdate, time: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Host Name</label>
                <select
                  value={meetingToUpdate.host_name}
                  onChange={(e) => setMeetingToUpdate({ ...meetingToUpdate, host_name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {filterOptions.faculty.filter(f => f !== 'All').map((faculty) => (
                    <option key={faculty} value={faculty}>
                      {faculty}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meeting Type</label>
                <select
                  value={meetingToUpdate.location.isOnline}
                  onChange={(e) => {
                    const isOnline = e.target.value === 'true';
                    setMeetingToUpdate({
                      ...meetingToUpdate,
                      location: {
                        isOnline,
                        room: '',
                        meetingLink: ''
                      }
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="false">In-Person</option>
                  <option value="true">Online</option>
                </select>
              </div>
              {meetingToUpdate.location.isOnline ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Meeting Link</label>
                  <input
                    type="text"
                    value={meetingToUpdate.location.meetingLink}
                    onChange={(e) =>
                      setMeetingToUpdate({
                        ...meetingToUpdate,
                        location: { ...meetingToUpdate.location, meetingLink: e.target.value }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Room</label>
                  <input
                    type="text"
                    value={meetingToUpdate.location.room}
                    onChange={(e) =>
                      setMeetingToUpdate({
                        ...meetingToUpdate,
                        location: { ...meetingToUpdate.location, room: e.target.value }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowUpdateDialog(false);
                  setMeetingToUpdate(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateMeeting}
                className="px-4 py-2 bg-[#13274C] text-white rounded hover:bg-opacity-90"
              >
                Update Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingList; 