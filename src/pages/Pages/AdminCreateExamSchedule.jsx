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

  const handleDelete = async (row) => {
    if (!window.confirm("Are you sure you want to delete this exam schedule?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/exam/delete/${row.raw.id}`, {
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
    }
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">You are not authenticated as an admin.</p>
        <button
          onClick={() => navigate("/admin/login")}
          className="bg-[#13274C] text-white px-6 py-3 rounded-md hover:bg-[#1a3561] transition-colors"
        >
          Go to Admin Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <div className={`w-full max-w-xl bg-white rounded-lg shadow-lg p-8 mt-8 mb-8 ${editingId ? 'border-4 border-blue-400' : 'border border-gray-200'}`}>
        <h2 className="text-3xl font-bold text-[#13274C] mb-6 text-center">
          {editingId ? "Update Exam Schedule" : "Create Exam Schedule"}
        </h2>
        {message.text && (
          <div className={`mb-4 px-4 py-2 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
            <select
              name="course_code"
              value={formData.course_code}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select Course Code</option>
              {courses.map((course) => (
                <option key={course.code} value={course.code}>
                  {course.code}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room No</label>
            <input
              type="text"
              name="room_no"
              value={formData.room_no}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invigilator</label>
            <input
              type="text"
              name="invigilator"
              value={formData.invigilator}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
            <SelectField
              label=""
              value={formData.semester}
              options={semesterOptions}
              onChange={(val) => handleSelectChange("semester", val)}
              className="w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#13274C] text-white rounded-lg hover:bg-[#1e3a5f]"
            >
              {editingId ? "Update Exam Schedule" : "Create Exam Schedule"}
            </button>
            {editingId && (
              <button
                type="button"
                className="ml-4 px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
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
                  setShowForm(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#13274C] mb-4 text-center">All Exam Schedules</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#FFC300]">
              <tr>
                {['Date', 'Time', 'Course Code', 'Room No', 'Invigilator', 'Semester', 'Status', 'Actions'].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No exams found.
                  </td>
                </tr>
              ) : (
                examData.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 1 ? "bg-gray-50" : undefined}>
                    <td className="px-4 py-3 text-left text-sm text-gray-900">{row.date}</td>
                    <td className="px-4 py-3 text-left text-sm text-gray-900">{row.time}</td>
                    <td className="px-4 py-3 text-left text-sm text-gray-900">{row.course_code}</td>
                    <td className="px-4 py-3 text-left text-sm text-gray-900">{row.roomNo}</td>
                    <td className="px-4 py-3 text-left text-sm text-gray-900">{row.invigilator}</td>
                    <td className="px-4 py-3 text-left text-sm text-gray-900">{row.semester}</td>
                    <td className="px-4 py-3 text-left text-sm text-gray-900">
                      <span className={
                        row.status === "approved"
                          ? "bg-green-100 text-green-700 px-2 py-1 rounded"
                          : row.status === "rejected"
                          ? "bg-red-100 text-red-700 px-2 py-1 rounded"
                          : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded"
                      }>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-left text-sm text-gray-900">
                      <button
                        className="mr-2 px-3 py-1 bg-[#13274C] text-white rounded hover:bg-[#1e3a5f]"
                        onClick={() => handleEdit(row)}
                      >
                        Update
                      </button>
                      <button
                        className="mr-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(row)}
                      >
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
  );
};

export default AdminCreateExamSchedule; 