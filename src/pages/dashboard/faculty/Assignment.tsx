import React, { useState } from 'react';

const Assignment: React.FC = () => {
  // Sample assignment data
  const assignments = [
    { id: 1, title: 'Introduction to Algorithms', dueDate: '2025-07-20', submissions: 25, totalStudents: 30 },
    { id: 2, title: 'Data Structures Project', dueDate: '2025-07-25', submissions: 15, totalStudents: 30 },
    { id: 3, title: 'Database Design Assignment', dueDate: '2025-07-30', submissions: 20, totalStudents: 30 },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#0F2545] text-white p-6">
        <h1 className="text-3xl font-bold">Faculty Assignment Dashboard</h1>
        <p className="mt-2 text-gray-200">Manage and track student assignments</p>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* Create Assignment Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#F39C12] text-white px-6 py-2 rounded-md hover:bg-[#e08b11] transition-colors"
          >
            Create New Assignment
          </button>
        </div>

        {/* Assignment List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-[#0F2545]">{assignment.title}</h2>
              <p className="text-gray-600 mt-2">Due: {assignment.dueDate}</p>
              <p className="text-gray-600 mt-1">
                Submissions: {assignment.submissions}/{assignment.totalStudents}
              </p>
              <div className="mt-4">
                <button className="text-[#F39C12] hover:underline">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal for Creating Assignment */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-[#0F2545] mb-4">Create New Assignment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[#0F2545] font-medium">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                  placeholder="Enter assignment title"
                />
              </div>
              <div>
                <label className="block text-[#0F2545] font-medium">Due Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#F39C12] text-white rounded-md hover:bg-[#e08b11]"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignment;