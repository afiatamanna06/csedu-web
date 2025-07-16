import React, { useState } from "react";

interface Course {
  id: number;
  name: string;
  code: string;
  teacher: string;
  year: number;
  semester: string;
}

const mockCourses: Course[] = [
  { id: 1, name: "Data Structures", code: "CSE201", teacher: "Dr. Rahman", year: 2025, semester: "1st Semester" },
  { id: 2, name: "Algorithms", code: "CSE202", teacher: "Prof. Karim", year: 2025, semester: "1st Semester" },
  { id: 3, name: "Operating Systems", code: "CSE301", teacher: "Dr. Arefin", year: 2025, semester: "2nd Semester" },
  { id: 4, name: "Machine Learning", code: "CSE401", teacher: "Dr. Mahmud", year: 2024, semester: "2nd Semester" },
  { id: 5, name: "Compiler Design", code: "CSE402", teacher: "Prof. Nargis", year: 2024, semester: "1st Semester" },
];

const StudentCourses: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedSemester, setSelectedSemester] = useState<string>("1st Semester");

  const filteredCourses = mockCourses.filter(
    (course) => course.year === selectedYear && course.semester === selectedSemester
  );

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-[#13274C] mb-6">My Courses</h2>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            {[2025, 2024, 2023].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            {["1st Semester", "2nd Semester"].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Table */}
      {filteredCourses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 border-b">Course Name</th>
                <th className="px-6 py-3 border-b">Course Code</th>
                <th className="px-6 py-3 border-b">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 border-b">{course.name}</td>
                  <td className="px-6 py-3 border-b">{course.code}</td>
                  <td className="px-6 py-3 border-b">{course.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No courses found for {selectedSemester} {selectedYear}.</p>
      )}
    </div>
  );
};

export default StudentCourses;
