import React from 'react';
import TeacherSidebar from '../components/TeacherSidebar';

export default function TeacherLayout({ children }) {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <TeacherSidebar />
      <div className="flex flex-col flex-1 overflow-hidden md:ml-64">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-8 px-8 ml-4">
            <div className="max-w-7xl mx-auto pl-4">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
