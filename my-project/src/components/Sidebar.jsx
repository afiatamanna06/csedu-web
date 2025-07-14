import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-72 xl:w-80 2xl:w-96 bg-white shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-6">Admin</h2>
        <nav className="space-y-2">
          <Link
            to="/admin/dashboard" 
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/dashboard') 
                ? 'bg-[#FFC300] text-[#13274C]' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">🏠</span>
            Dashboard
          </Link>
          <Link
            to="/bookings"
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
            to="/meetings"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/meetings') 
                ? 'bg-[#FFC300] text-[#13274C]' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">📊</span>
            Meetings
          </Link>
          <Link 
            to="/users" 
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/users') 
                ? 'bg-[#FFC300] text-[#13274C]' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">👥</span>
            Users
          </Link>
          <Link 
            to="/settings" 
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/settings') 
                ? 'bg-[#FFC300] text-[#13274C]' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">⚙️</span>
            Settings
          </Link>
          
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 