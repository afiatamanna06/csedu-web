import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ExamSchedule from "./Pages/ExamSchedule";
import GradeInput from "./Pages/GradeInput";
import RoomAvailability from "./Pages/RoomAvailability";
import BookRoom from "./Pages/BookRoom";
import BookingRequests from "./Pages/BookingRequests";
import MeetingList from "./Pages/MeetingList";
import AdminDashboard from "./Pages/AdminDashboard";
import Achievements from "./Pages/Achievements";
import AuthProvider from "./contexts/AuthContext";
import SidebarLayout from "./components/SidebarLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import GradeManagement from "./Pages/GradeManagement";
import UserManagement from "./Pages/UserManagement";
import AdminSignup from "./Pages/AdminSignup";
import AdminCreateExamSchedule from "./Pages/AdminCreateExamSchedule";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/exam-schedule" element={<ExamSchedule />} />
          <Route 
            path="/admin/create-examschedule" 
            element={
              <ProtectedRoute requiredRole="Admin">
                <SidebarLayout>
                  <AdminCreateExamSchedule />
                </SidebarLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/grade-input" 
            element={
              <ProtectedRoute requiredRole="Teacher">
                <GradeManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/faculty" 
            element={
              <ProtectedRoute requiredRole="Teacher">
                <TeacherLayout>
                  <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Teacher Dashboard</h1>
                    <p className="text-gray-600">Welcome to the CSEDU Teacher Portal</p>
                  </div>
                </TeacherLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/room-availability" 
            element={
              <ProtectedRoute requiredRole="Teacher">
                <TeacherLayout>
                  <RoomAvailability />
                </TeacherLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/book-room" 
            element={
              <ProtectedRoute requiredRole="Teacher">
                <TeacherLayout>
                  <BookRoom />
                </TeacherLayout>
              </ProtectedRoute>
            } 
          />
          <Route path="/achievements" element={<Achievements />} />

         
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute requiredRole="Admin">
                <SidebarLayout>
                  <BookingRequests />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-management"
            element={
              <ProtectedRoute requiredRole="Admin">
                <SidebarLayout>
                  <UserManagement />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/meetings"
            element={
              <ProtectedRoute requiredRole="Teacher">
                <TeacherLayout>
                  <MeetingList />
                </TeacherLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="Admin">
                <SidebarLayout>
                  <AdminDashboard />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-[#13274C]">
                      Welcome to CSEDU Portal
                    </h1>
                    <p className="text-xl text-gray-600">
                      Select an option to get started
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Authentication */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold mb-4 text-[#13274C]">Authentication</h2>
                      <div className="space-y-3">
                        <Link
                          to="/login"
                          className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Student Login
                        </Link>
                        <Link
                          to="/signup"
                          className="block w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Student Signup
                        </Link>
                        <Link
                          to="/forgot-password"
                          className="block w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Forgot Password
                        </Link>
                      </div>
                    </div>

                    {/* Admin Access */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold mb-4 text-[#13274C]">Admin Access</h2>
                      <div className="space-y-3">
                        <Link
                          to="/admin/signup"
                          className="block w-full bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Admin Signup
                        </Link>
                        <Link
                          to="/admin/dashboard"
                          className="block w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Admin Dashboard
                        </Link>
                      </div>
                    </div>

                    {/* Academic */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold mb-4 text-[#13274C]">Academic</h2>
                      <div className="space-y-3">
                        <Link
                          to="/exam-schedule"
                          className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Exam Schedule
                        </Link>
                        <Link
                          to="/admin/create-examschedule"
                          className="block w-full bg-indigo-400 hover:bg-indigo-500 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Create Exam Schedule
                        </Link>
                        <Link
                          to="/grade-input"
                          className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Grade Management
                        </Link>
                        <Link
                          to="/achievements"
                          className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Achievements
                        </Link>
                      </div>
                    </div>

                    {/* Room Management */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold mb-4 text-[#13274C]">Room Management</h2>
                      <div className="space-y-3">
                        <Link
                          to="/teacher/room-availability"
                          className="block w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Room Availability
                        </Link>
                        <Link
                          to="/book-room"
                          className="block w-full bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Book Room
                        </Link>
                        <Link
                          to="/admin/bookings"
                          className="block w-full bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Booking Requests (Admin)
                        </Link>
                      </div>
                    </div>

                    {/* Meetings & Management */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold mb-4 text-[#13274C]">Meetings & Management</h2>
                      <div className="space-y-3">
                        <Link
                          to="/teacher/meetings"
                          className="block w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          Meeting List
                        </Link>
                        <Link
                          to="/admin/user-management"
                          className="block w-full bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded transition-colors text-center"
                        >
                          User Management (Admin)
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
