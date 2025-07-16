import { useState } from "react";
import SelectField from "../components/SelectField";
import GradeTable from "../components/GradeTable";

const GradeManagement = () => {
  const [selectedSemester, setSelectedSemester] = useState("4th year - 1st Semester");
  const [selectedCourse, setSelectedCourse] = useState("Data Structures and Algorithms 2012");
  const [studentData, setStudentData] = useState([
    { id: "20201001", name: "Arif Rahman", grade: "D+" },
    { id: "20201002", name: "Fatima Khan", grade: "A" },
    { id: "20201003", name: "Imran Ali", grade: "B+" },
    { id: "20201004", name: "Nadia Islam", grade: "B" },
    { id: "20201005", name: "Rohan Sharma", grade: "C+" },
  ]);

  // Dropdown options
  const dropdownOptions = {
    semester: [
      "4th year - 1st Semester",
      "4th year - 2nd Semester",
      "3rd year - 1st Semester",
      "3rd year - 2nd Semester",
      "2nd year - 1st Semester",
      "2nd year - 2nd Semester",
      "1st year - 1st Semester",
      "1st year - 2nd Semester",
    ],
    course: [
      "Data Structures and Algorithms 2012",
      "Artificial Intelligence",
      "Machine Learning",
      "Operating Systems",
      "Linear Algebra",
      "Database Systems",
      "Computer Networks",
      "Software Engineering",
    ],
  };

  const handleGradeUpdate = (studentId, newGrade) => {
    setStudentData(prevData =>
      prevData.map(student =>
        student.id === studentId ? { ...student, grade: newGrade } : student
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-3xl font-medium text-center mb-8">Grade input</h1>

        {/* Filters Section */}
        <div className="relative mb-8">
          {/* Blue Background */}
          <div className="bg-[#13274C] h-32 rounded-lg"></div>

          {/* Filters Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-6">
            <div className="w-64">
              <SelectField
                label="Semester"
                value={selectedSemester}
                options={dropdownOptions.semester}
                onChange={setSelectedSemester}
              />
            </div>
            <div className="w-64">
              <SelectField
                label="Courses"
                value={selectedCourse}
                options={dropdownOptions.course}
                onChange={setSelectedCourse}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <GradeTable data={studentData} onGradeUpdate={handleGradeUpdate} />
        </div>
      </div>
    </div>
  );
};

export default GradeManagement; 