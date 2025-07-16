import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SelectField } from "@/components/ui/select-field";
import { useAuth } from "@/contexts/auth-context";

const API_BASE_URL = "http://localhost:8000";

interface Course {
  code: string;
  title: string;
}

interface ExamData {
  id: string;
  date: string;
  time: string;
  course_code: string;
  roomNo: string;
  invigilator: string;
  semester: string;
  status: string;
  raw: any; // This will store the raw exam data from the API
}

interface FormData {
  date: string;
  start_time: string;
  end_time: string;
  course_code: string;
  room_no: string;
  invigilator: string;
  semester: string;
  status: string;
}

interface Message {
  text: string;
  type: "success" | "error" | "";
}

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
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [message, setMessage] = useState<Message>({ text: "", type: "" });
  const [formData, setFormData] = useState<FormData>({
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

  const [examData, setExamData] = useState<ExamData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
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
    if (!currentUser || currentUser.role.toLowerCase() !== "admin") {
      navigate("/login/admin");
    }
    setIsLoading(false);
  }, [currentUser, navigate]);

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
      const mapped = response.data.map((exam: any) => ({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (row: ExamData) => {
    setEditingId(row.raw.id);
    // Format times for HTML time inputs (remove seconds if present)
    const formatTimeForInput = (time: string) => {
      if (!time) return '';
      return time.substring(0, 5); // Extract HH:MM from HH:MM:SS
    };
    
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

  const handleDelete = async (row: ExamData) => {
    if (!window.confirm("Are you sure you want to delete this exam schedule?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/exam/delete/${row.raw.id}`, {
        headers: getAuthHeaders(),
      });
      setMessage({ text: "Exam schedule deleted successfully!", type: "success" });
      fetchExams();
    } catch (error: any) {
      let msg = "Failed to delete exam schedule.";
      if (error.response?.data?.detail) {
        msg = error.response.data.detail;
      }
      setMessage({ text: msg, type: "error" });
    }
  };

  // const handleStatusUpdate = async (row: ExamData, newStatus: string) => {
  //   try {
  //     await axios.put(`${API_BASE_URL}/exam/update/${row.raw.id}`, { status: newStatus }, {
  //       headers: getAuthHeaders(),
  //     });
  //     setMessage({ text: `Exam schedule status updated to ${newStatus}!`, type: "success" });
  //     fetchExams();
  //   } catch (error: any) {
  //     let msg = "Failed to update status.";
  //     if (error.response?.data?.detail) {
  //       msg = error.response.data.detail;
  //     }
  //     setMessage({ text: msg, type: "error" });
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    if (!formData.date || !formData.start_time || !formData.end_time || !formData.course_code || !formData.room_no || !formData.invigilator || !formData.semester) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }

    // Format times to include seconds
    const formatTime = (time: string) => {
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
      fetchExams();
    } catch (error: any) {
      let msg = "Failed to save exam schedule.";
      if (error.response?.data?.detail) {
        msg = error.response.data.detail;
      }
      setMessage({ text: msg, type: "error" });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Exam Schedule</h1>

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

        {/* Form Section */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <SelectField
                label="Course"
                value={formData.course_code}
                options={courses.map(course => ({
                  label: `${course.code} - ${course.title}`,
                  value: course.code
                }))}
                onChange={(value) => handleSelectChange("course_code", value)}
              />

              <SelectField
                label="Semester"
                value={formData.semester}
                options={semesterOptions.map(sem => ({
                  label: sem,
                  value: sem
                }))}
                onChange={(value) => handleSelectChange("semester", value)}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room No
                </label>
                <input
                  type="text"
                  name="room_no"
                  value={formData.room_no}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invigilator
                </label>
                <input
                  type="text"
                  name="invigilator"
                  value={formData.invigilator}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <SelectField
                label="Status"
                value={formData.status}
                options={[
                  { label: "Pending", value: "pending" },
                  { label: "Approved", value: "approved" },
                  { label: "Cancelled", value: "cancelled" }
                ]}
                onChange={(value) => handleSelectChange("status", value)}
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                {editingId ? "Update" : "Create"} Exam Schedule
              </button>
            </div>
          </form>
        )}

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invigilator</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examData.map((exam, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.course_code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.roomNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.invigilator}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        exam.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : exam.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(exam)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exam)}
                      className="text-red-600 hover:text-red-900"
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
    </div>
  );
};

export default AdminCreateExamSchedule; 