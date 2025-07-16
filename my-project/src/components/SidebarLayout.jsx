import React from 'react';
import Sidebar from './Sidebar';

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout; 