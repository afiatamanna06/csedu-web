import React, { useState } from 'react';

const EllipsisIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-500"
  >
    <path
      d="M8 4C9.10449 4 10 3.10456 10 2C10 0.895437 9.10449 0 8 0C6.89551 0 6 0.895437 6 2C6 3.10456 6.89551 4 8 4Z"
      fill="currentColor"
    />
    <path
      d="M10 7.98438C10 9.08894 9.10449 9.98438 8 9.98438C6.89551 9.98438 6 9.08894 6 7.98438C6 6.87981 6.89551 5.98438 8 5.98438C9.10449 5.98438 10 6.87981 10 7.98438Z"
      fill="currentColor"
    />
    <path
      d="M10 14C10 15.1046 9.10449 16 8 16C6.89551 16 6 15.1046 6 14C6 12.8954 6.89551 12 8 12C9.10449 12 10 12.8954 10 14Z"
      fill="currentColor"
    />
  </svg>
);

const ExamTable = ({ data, onUpdate, onDelete }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (index, e) => {
    e.stopPropagation(); // Prevent event bubbling
    setActiveMenu(activeMenu === index ? null : index);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Header */}
        <thead className="bg-[#FFC300]">
          <tr>
            {["Date", "Time", "Course Code", "Course Name", "Room No", "Invigilator", "Actions"].map((header) => (
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

        {/* Table Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 1 ? "bg-gray-50" : undefined}
            >
              <td className="px-4 py-3 text-left text-sm text-gray-900">
                {row.date}
              </td>
              <td className="px-4 py-3 text-left text-sm text-gray-900">
                {row.time}
              </td>
              <td className="px-4 py-3 text-left text-sm text-gray-900">
                {row.courseCode}
              </td>
              <td className="px-4 py-3 text-left">
                <span className="text-sm text-blue-600 font-medium">
                  {row.courseName}
                </span>
              </td>
              <td className="px-4 py-3 text-left text-sm text-gray-900">
                {row.roomNo}
              </td>
              <td className="px-4 py-3 text-left text-sm text-gray-900">
                {row.invigilator}
              </td>
              <td className="px-4 py-3 text-left text-sm text-gray-900 relative">
                <button 
                  className="text-gray-400 hover:text-gray-500 p-1"
                  onClick={(e) => handleMenuClick(index, e)}
                >
                  <EllipsisIcon />
                </button>
                {activeMenu === index && (
                  <div 
                    className="absolute right-8 top-2 bg-white rounded-md shadow-lg border border-gray-200 z-50 min-w-[100px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        onUpdate(row);
                        setActiveMenu(null);
                      }}
                      className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        onDelete(row);
                        setActiveMenu(null);
                      }}
                      className="w-full px-4 py-2 text-red-600 hover:bg-gray-100 text-left border-t border-gray-200"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamTable;
