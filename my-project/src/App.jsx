import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import "./App.css";
import GradeManagement from "./Pages/GradeManagement";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/exam-schedule" element={<ExamSchedule />} />
          <Route path="/grade-input" element={<GradeManagement />} />
          <Route path="/room-availability" element={<RoomAvailability />} />
          <Route path="/book-room" element={<BookRoom />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route
            path="/bookings"
            element={
              <SidebarLayout>
                <BookingRequests />
              </SidebarLayout>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <SidebarLayout>
                <BookingRequests />
              </SidebarLayout>
            }
          />
          <Route
            path="/meetings"
            element={
              <SidebarLayout>
                <MeetingList />
              </SidebarLayout>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <SidebarLayout>
                <AdminDashboard />
              </SidebarLayout>
            }
          />
          <Route
            path="/"
            element={
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-8 text-[#13274C]">
                  Welcome to CSEDU Portal
                </h1>
                <p className="text-xl text-gray-600">
                  Select an option to get started
                </p>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
