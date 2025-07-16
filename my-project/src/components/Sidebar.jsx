import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/login');
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
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
              isActive('/admin/bookings') 
                ? 'bg-[#FFC300] text-[#13274C]' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">📅</span>
            Bookings
          </Link>
          <Link
            to="/admin/create-examschedule"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/create-examschedule') 
                ? 'bg-[#FFC300] text-[#13274C]' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">�</span>
            Create Exam Schedule
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

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#13274C] to-blue-600">
              <h3 className="text-xl font-bold text-white flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Confirm Logout
              </h3>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800 mb-1">Do you want to logout?</p>
                  <p className="text-sm text-gray-600">You will need to sign in again to access your account.</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={cancelLogout}
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-6 py-2.5 bg-gradient-to-r from-[#13274C] to-blue-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 