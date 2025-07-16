import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SelectField from "../components/SelectField";

const API_BASE_URL = "http://localhost:8000";

const getAuthToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const AdminCreateExamSchedule = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({
    date: "",
    start_time: "",
    end_time: "",
    course_code: "",
    room_no: "",
    invigilator: "",
    semester: "",
    status: "pending"
  });

  // Auto-dismiss message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message.text]);
  const [examData, setExamData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const semesterOptions = [
    "4-1",
    "4-2",
    "3-1",
    "3-2",
    "2-1",
    "2-2",
    "1-1",
    "1-2",
  ];

  // Authentication check
  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const token = getAuthToken();
        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        // Decode JWT
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const decoded = JSON.parse(jsonPayload);
        if (!decoded || !decoded.role || decoded.role.toLowerCase() !== "admin") {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  // Fetch courses for dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/course/list?page_size=100`);
        setCourses(response.data.courses || []);
      } catch (error) {
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  // Fetch all exam schedules
  const fetchExams = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/exam/filter`);
      const mapped = response.data.map((exam) => ({
        id: exam.id,
        date: exam.date,
        time: exam.start_time ? `${exam.start_time.substring(0,5)} - ${exam.end_time ? exam.end_time.substring(0,5) : ''}` : '',
        course_code: exam.course_code,
        roomNo: exam.room_no,
        invigilator: exam.invigilator,
        semester: exam.semester,
        status: exam.status || "pending",
        raw: exam
      }));
      setExamData(mapped);
    } catch (err) {
      setExamData([]);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (row) => {
    setEditingId(row.raw.id);
    // Format times for HTML time inputs (remove seconds if present)
    const formatTimeForInput = (time) => {
      if (!time) return '';
      return time.substring(0, 5); // Extract HH:MM from HH:MM:SS
    };
    
    console.log('Editing exam:', row.raw); // Debug log
    
    setFormData({
      date: row.raw.date,
      start_time: formatTimeForInput(row.raw.start_time),
      end_time: formatTimeForInput(row.raw.end_time),
      course_code: row.raw.course_code,
      room_no: row.raw.room_no,
      invigilator: row.raw.invigilator,
      semester: row.raw.semester,
      status: row.raw.status || "pending"
    });
    setShowForm(true);
    
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = (row) => {
    setDeleteTarget(row);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/exam/delete/${deleteTarget.raw.id}`, {
        headers: getAuthHeaders(),
      });
      setMessage({ text: "Exam schedule deleted successfully!", type: "success" });
      fetchExams();
    } catch (error) {
      let msg = "Failed to delete exam schedule.";
      if (error.response && error.response.data && error.response.data.detail) {
        msg = error.response.data.detail;
      }
      setMessage({ text: msg, type: "error" });
    } finally {
      setShowDeleteDialog(false);
      setDeleteTarget(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteTarget(null);
  };

  const handleStatusUpdate = async (row, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/exam/update/${row.raw.id}`, { status: newStatus }, {
        headers: getAuthHeaders(),
      });
      setMessage({ text: `Exam schedule status updated to ${newStatus}!`, type: "success" });
      fetchExams();
    } catch (error) {
      let msg = "Failed to update status.";
      if (error.response && error.response.data && error.response.data.detail) {
        msg = error.response.data.detail;
      }
      setMessage({ text: msg, type: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    if (!formData.date || !formData.start_time || !formData.end_time || !formData.course_code || !formData.room_no || !formData.invigilator || !formData.semester) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }

    // Format times to include seconds
    const formatTime = (time) => {
      if (!time) return '';
      // If time already has seconds (HH:MM:SS), return as is
      if (time.includes(':') && time.split(':').length === 3) {
        return time;
      }
      // If time is HH:MM format, add seconds
      return `${time}:00`;
    };

    try {
      const payload = {
        date: formData.date,
        start_time: formatTime(formData.start_time),
        end_time: formatTime(formData.end_time),
        course_code: formData.course_code,
        room_no: formData.room_no,
        invigilator: formData.invigilator,
        semester: formData.semester,
        status: formData.status || "pending"
      };

      if (editingId) {
        await axios.put(`${API_BASE_URL}/exam/update/${editingId}`, payload, {
          headers: getAuthHeaders(),
        });
        setMessage({ text: "Exam schedule updated successfully!", type: "success" });
      } else {
        await axios.post(`${API_BASE_URL}/exam/create`, payload, {
          headers: getAuthHeaders(),
        });
        setMessage({ text: "Exam schedule created successfully!", type: "success" });
      }
      setFormData({
        date: "",
        start_time: "",
        end_time: "",
        course_code: "",
        room_no: "",
        invigilator: "",
        semester: "",
        status: "pending"
      });
      setEditingId(null);
      setShowForm(false);
      fetchExams();
    } catch (error) {
      let msg = editingId ? "Failed to update exam schedule." : "Failed to create exam schedule.";
      if (error.response && error.response.data && error.response.data.detail) {
        msg = error.response.data.detail;
      }
      setMessage({ text: msg, type: "error" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You must be logged in as an admin to access this page.</p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-[#13274C] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-[#13274C] mb-2">Exam Schedule Management</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create and manage exam schedules for all courses and semesters
          </p>
        </div>

        {/* Create/Edit Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-8">
          <div className="px-8 py-6 bg-gradient-to-r from-[#13274C] to-blue-600">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {editingId ? "Update Exam Schedule" : "Create New Exam Schedule"}
            </h2>
          </div>

          <form className="p-8 space-y-6" onSubmit={handleSubmit}>
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center border-b border-gray-200 pb-2">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule Details
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Date */}
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Exam Date
                  </label>
                  <div className="relative">
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-gray-900"
                    />
                  </div>
                </div>

                {/* Start Time */}
                <div className="space-y-2">
                  <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <div className="relative">
                    <input
                      id="start_time"
                      name="start_time"
                      type="time"
                      required
                      value={formData.start_time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-gray-900"
                      placeholder="09:00"
                    />
                  </div>
                </div>

                {/* End Time */}
                <div className="space-y-2">
                  <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <div className="relative">
                    <input
                      id="end_time"
                      name="end_time"
                      type="time"
                      required
                      value={formData.end_time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-gray-900"
                      placeholder="12:00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Course and Venue Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center border-b border-gray-200 pb-2">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Course & Venue Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Course Code */}
                <div className="space-y-2">
                  <label htmlFor="course_code" className="block text-sm font-medium text-gray-700">
                    Course Code
                  </label>
                  <select
                    id="course_code"
                    name="course_code"
                    required
                    value={formData.course_code}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-gray-900"
                  >
                    <option value="">Select Course Code (e.g., CSE305)</option>
                    {courses.map((course) => (
                      <option key={course.code} value={course.code}>
                        {course.code} - {course.title || course.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Semester */}
                <div className="space-y-2">
                  <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                    Semester
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    required
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-gray-900"
                  >
                    <option value="">Select Semester (e.g., 4-1)</option>
                    {semesterOptions.map((semester) => (
                      <option key={semester} value={semester}>
                        {semester}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Room Number */}
                <div className="space-y-2">
                  <label htmlFor="room_no" className="block text-sm font-medium text-gray-700">
                    Room Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <input
                      id="room_no"
                      name="room_no"
                      type="text"
                      required
                      value={formData.room_no}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-gray-900 placeholder-gray-400"
                      placeholder="e.g., Room 301, Lab 1, Auditorium"
                    />
                  </div>
                </div>

                {/* Invigilator */}
                <div className="space-y-2">
                  <label htmlFor="invigilator" className="block text-sm font-medium text-gray-700">
                    Invigilator
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      id="invigilator"
                      name="invigilator"
                      type="text"
                      required
                      value={formData.invigilator}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-gray-900 placeholder-gray-400"
                      placeholder="e.g., Dr. Rahman, Prof. Ahmed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex justify-end space-x-4">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      date: "",
                      start_time: "",
                      end_time: "",
                      course_code: "",
                      room_no: "",
                      invigilator: "",
                      semester: "",
                      status: "pending"
                    });
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#13274C] to-blue-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {editingId ? "Update Schedule" : "Create Schedule"}
              </button>
            </div>
          </form>
        </div>
        {/* Exam Schedules Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-8 py-6 bg-gradient-to-r from-[#13274C] to-blue-600">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              All Exam Schedules
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  {['Date', 'Time', 'Course Code', 'Room', 'Invigilator', 'Semester', 'Status', 'Actions'].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {examData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">No exam schedules found</p>
                        <p className="text-gray-400 text-sm mt-1">Create your first exam schedule above</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  examData.map((row, index) => (
                    <tr key={row.id} className={`hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(row.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {row.time}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.course_code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {row.roomNo}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {row.invigilator}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {row.semester}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : row.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(row)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(row)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            {/* Dialog Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-red-700">
              <h3 className="text-xl font-bold text-white flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Confirm Delete
              </h3>
            </div>

            {/* Dialog Body */}
            <div className="px-6 py-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800 mb-1">Delete Exam Schedule?</p>
                  <p className="text-sm text-gray-600">
                    Are you sure you want to delete this exam schedule? This action cannot be undone.
                  </p>
                </div>
              </div>
              
              {deleteTarget && (
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">Course:</div>
                    <div className="font-medium">{deleteTarget.course_code}</div>
                    <div className="text-gray-600">Date:</div>
                    <div className="font-medium">{deleteTarget.date}</div>
                    <div className="text-gray-600">Time:</div>
                    <div className="font-medium">{deleteTarget.time}</div>
                    <div className="text-gray-600">Room:</div>
                    <div className="font-medium">{deleteTarget.roomNo}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Dialog Footer */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      {message.text && (
        <div className="fixed bottom-4 right-4 z-50 min-w-80 max-w-96">
          <div className={`transform transition-all duration-300 ease-in-out ${
            message.text ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}>
            <div className={`border rounded-xl shadow-lg p-4 ${
              message.type === "success" 
                ? "bg-green-50 border-green-200" 
                : "bg-red-50 border-red-200"
            }`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className={`w-5 h-5 mt-0.5 ${
                    message.type === "success" ? "text-green-400" : "text-red-400"
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {message.type === "success" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className={`text-sm font-medium ${
                    message.type === "success" ? "text-green-800" : "text-red-800"
                  }`}>
                    {message.type === "success" ? "Success" : "Error"}
                  </p>
                  <p className={`text-sm mt-1 whitespace-nowrap ${
                    message.type === "success" ? "text-green-700" : "text-red-700"
                  }`}>
                    {message.text}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() => setMessage({ text: "", type: "" })}
                    className={`inline-flex ${
                      message.type === "success" 
                        ? "text-green-400 hover:text-green-600" 
                        : "text-red-400 hover:text-red-600"
                    } focus:outline-none`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCreateExamSchedule; 