import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-72 xl:w-80 2xl:w-96 bg-white shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-6">Admin</h2>
        <nav className="space-y-2">
          <Link
            to="/admin/dashboard" 
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard') 
                ? 'bg-[#FFC300] text-[#13274C]' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">🏠</span>
            Dashboard
          </Link>
          <Link
            to="/admin/user-management"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/user-management') 
                ? 'bg-[#FFC300] text-[#13274C]' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">👥</span>
            User Management
          </Link>
          <Link
            to="/admin/bookings"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/bookings') 
                ? 'bg-[#FFC300] text-[#13274C]' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">📅</span>
            Bookings
          </Link>
          <Link
            to="/teacher/meetings"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/meetings') 
                ? 'bg-[#FFC300] text-[#13274C]' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">📊</span>
            Meetings
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <span className="mr-3">🚪</span>
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 