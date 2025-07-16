import { useState, useMemo } from "react";
import SelectField from "../components/SelectField";
import GradeTable from "../components/GradeTable";

const GradeInput = () => {
  const [selectedSemester, setSelectedSemester] = useState(
    "4th year - 1st Semester",
  );
  const [selectedCourse, setSelectedCourse] = useState(
    "CSE-401: Data Structures and Algorithms",
  );
  const [selectedRoom, setSelectedRoom] = useState("3rd floor : 412");

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
      "CSE-401: Data Structures and Algorithms",
      "CSE-402: Artificial Intelligence",
      "CSE-403: Machine Learning",
      "CSE-404: Operating Systems",
      "CSE-405: Linear Algebra",
      "CSE-406: Database Systems",
      "CSE-407: Computer Networks",
      "CSE-408: Software Engineering",
    ],
    room: [
      "3rd floor : 412",
      "2nd floor : 201",
      "2nd floor : 202",
      "3rd floor : 301",
      "3rd floor : 302",
      "4th floor : 401",
      "4th floor : 402",
      "1st floor : 101",
    ],
  };

  // Sample student grade data
  const [studentData, setStudentData] = useState([
    {
      id: "20201001",
      name: "Arif Rahman",
      grade: "A+",
      semester: "4th year - 1st Semester",
      course: "CSE-401: Data Structures and Algorithms",
      courseCode: "CSE-401",
      room: "3rd floor : 412",
    },
    {
      id: "20201002",
      name: "Fatima Khan",
      grade: "A",
      semester: "4th year - 1st Semester",
      course: "CSE-401: Data Structures and Algorithms",
      courseCode: "CSE-401",
      room: "3rd floor : 412",
    },
    {
      id: "20201003",
      name: "Imran Ali",
      grade: "B+",
      semester: "4th year - 1st Semester",
      course: "CSE-401: Data Structures and Algorithms",
      courseCode: "CSE-401",
      room: "3rd floor : 412",
    },
    {
      id: "20201004",
      name: "Nadia Islam",
      grade: "B",
      semester: "4th year - 1st Semester",
      course: "CSE-401: Data Structures and Algorithms",
      courseCode: "CSE-401",
      room: "3rd floor : 412",
    },
    {
      id: "20201005",
      name: "Rohan Sharma",
      grade: "C+",
      semester: "4th year - 1st Semester",
      course: "CSE-401: Data Structures and Algorithms",
      courseCode: "CSE-401",
      room: "3rd floor : 412",
    },
    {
      id: "20201006",
      name: "Priya Verma",
      grade: "C",
      semester: "4th year - 1st Semester",
      course: "CSE-401: Data Structures and Algorithms",
      courseCode: "CSE-401",
      room: "3rd floor : 412",
    },
    {
      id: "20201007",
      name: "Vikram Singh",
      grade: "D+",
      semester: "4th year - 1st Semester",
      course: "CSE-401: Data Structures and Algorithms",
      courseCode: "CSE-401",
      room: "3rd floor : 412",
    },
    {
      id: "20201008",
      name: "Anjali Kapoor",
      grade: "D",
      semester: "4th year - 1st Semester",
      course: "CSE-401: Data Structures and Algorithms",
      courseCode: "CSE-401",
      room: "3rd floor : 412",
    },
    {
      id: "20201009",
      name: "Rahul Gupta",
      grade: "F",
      semester: "4th year - 1st Semester",
      course: "CSE-401: Data Structures and Algorithms",
      courseCode: "CSE-401",
      room: "3rd floor : 412",
    },
    {
      id: "20201010",
      name: "Sneha Reddy",
      grade: "A+",
      semester: "4th year - 1st Semester",
      course: "CSE-401: Data Structures and Algorithms",
      courseCode: "CSE-401",
      room: "3rd floor : 412",
    },
  ]);

  // Filter student data based on selected options
  const filteredStudentData = useMemo(() => {
    return studentData.filter((student) => {
      const matchesSemester = student.semester === selectedSemester;
      const matchesCourse = student.course === selectedCourse;
      const matchesRoom = student.room === selectedRoom;

      return matchesSemester && matchesCourse && matchesRoom;
    });
  }, [selectedSemester, selectedCourse, selectedRoom, studentData]);

  // Handle grade update
  const handleGradeUpdate = (studentId, newGrade) => {
    setStudentData((prevData) =>
      prevData.map((student) =>
        student.id === studentId ? { ...student, grade: newGrade } : student,
      ),
    );
  };

  // Handle submit
  const handleSubmit = () => {
    console.log("Submitting grades:", filteredStudentData);
    alert("Grades submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-8">
          <h1
            className="text-4xl font-medium text-black mb-2"
            style={{
              fontFamily:
                "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Grade input
          </h1>
        </header>

        <div className="w-full h-32 bg-[#13274C] rounded-none shadow-lg mb-8 flex items-center justify-center">

        </div>

        <div className="relative -mt-20 mb-8">
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="bg-[#FFC300] border border-black border-opacity-8 rounded-md shadow-lg p-2 w-60">
              <SelectField
                label="Semester"
                value={selectedSemester}
                options={dropdownOptions.semester}
                onChange={setSelectedSemester}
                className="w-full"
                variant="highlighted"
              />
            </div>

            <div className="bg-[#FFC300] border border-black border-opacity-8 rounded-md shadow-lg p-2 w-60">
              <SelectField
                label="Courses"
                value={selectedCourse}
                options={dropdownOptions.course}
                onChange={setSelectedCourse}
                className="w-full"
                variant="highlighted"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#FEEBAD] p-4">
          <div className="bg-[#FAFAFA] border border-[#D4DBE3] rounded-xl overflow-hidden">
            {filteredStudentData.length > 0 ? (
              <GradeTable
                data={filteredStudentData}
                onGradeUpdate={handleGradeUpdate}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                No students found matching the selected filters
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-3 px-7 py-4 bg-[#13274D] text-white rounded-lg shadow-sm hover:bg-[#0f1f3a] transition-colors"
            style={{
              fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            <span className="text-lg font-medium">Submit</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 17L14.5 12L9.5 7"
                stroke="white"
                strokeWidth="2.03636"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradeInput;
