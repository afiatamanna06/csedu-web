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

const ExamTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Header */}
        <thead className="bg-[#FFC300]">
          <tr>
            <th scope="col" className="w-4"></th>
            {["Date", "Time", "Course Code", "Course Name", "Room No", "Invigilator"].map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
              >
                {header}
              </th>
            ))}
            <th scope="col" className="w-4"></th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 1 ? "bg-gray-50" : undefined}
            >
              <td className="w-4"></td>
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
              <td className="w-4">
                <button className="text-gray-400 hover:text-gray-500">
                  <EllipsisIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamTable;
