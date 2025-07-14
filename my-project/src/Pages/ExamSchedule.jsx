import { useState, useMemo } from "react";
import SelectField from "../components/SelectField";
import ExamTable from "../components/ExamTable";

const ExamSchedule = () => {
  const [selectedSemester, setSelectedSemester] = useState("4th year - 1st Semester");
  const [selectedCourse, setSelectedCourse] = useState("Artificial Intelligence");
  const [selectedRoom, setSelectedRoom] = useState("3rd floor : 412");
  const [selectedInvigilator, setSelectedInvigilator] = useState("All");

  // Dropdown options moved to a separate object for better organization
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
      "Artificial Intelligence",
      "Data Structures and Algorithms 2012",
      "Machine Learning",
      "Operating Systems",
      "Linear Algebra",
      "Database Systems",
      "Computer Networks",
      "Software Engineering",
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
    invigilator: [
      "Md Mosaddek Khan",
      "Dr. Sarah Johnson",
      "Prof. David Lee",
      "Dr. Emily Chen"
    ]
  };

  // Sample exam data
  const examData = [
    {
      date: "2025-06-10",
      time: "10:00 AM",
      courseCode: "CSE 4112",
      courseName: "Artificial Intelligence",
      roomNo: "412",
      invigilator: "Md Mosaddek Khan",
      semester: "4th year - 1st Semester"
    },
    {
      date: "2025-06-10",
      time: "2:00 PM",
      courseCode: "CSE 4113",
      courseName: "Operating Systems",
      roomNo: "201",
      invigilator: "Dr. Sarah Johnson",
      semester: "4th year - 1st Semester"
    },
    {
      date: "2025-06-11",
      time: "10:00 AM",
      courseCode: "CSE 3101",
      courseName: "Data Structures and Algorithms 2012",
      roomNo: "301",
      invigilator: "Prof. David Lee",
      semester: "3rd year - 1st Semester"
    },
    {
      date: "2025-06-12",
      time: "11:00 AM",
      courseCode: "CSE 2201",
      courseName: "Linear Algebra",
      roomNo: "412",
      invigilator: "Dr. Emily Chen",
      semester: "2nd year - 2nd Semester"
    },
  ];

  // Filter the exam data based on selected options
  const filteredExamData = useMemo(() => {
    return examData.filter(exam => {
      const matchesSemester = selectedSemester === "All" || exam.semester === selectedSemester;
      const matchesCourse = selectedCourse === "All" || exam.courseName === selectedCourse;
      const matchesRoom = selectedRoom === "All" || exam.roomNo === selectedRoom.split(" : ")[1];
      const matchesInvigilator = selectedInvigilator === "All" || exam.invigilator === selectedInvigilator;
      
      return matchesSemester && matchesCourse && matchesRoom && matchesInvigilator;
    });
  }, [selectedSemester, selectedCourse, selectedRoom, selectedInvigilator]);

  // Add "All" option to dropdowns
  const getOptionsWithAll = (options) => ["All", ...options];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container with max width and center alignment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-medium text-gray-900 font-poppins">
            Exam Schedule
          </h1>
          <p className="mt-2 text-sm text-gray-600 font-inter">
            Welcome to our exam scheduling system
          </p>
        </header>

        {/* Filters Section */}
        <div className="bg-[#13274C] rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SelectField
              label="Semester"
              value={selectedSemester}
              options={getOptionsWithAll(dropdownOptions.semester)}
              onChange={setSelectedSemester}
              className="w-full"
            />

            <SelectField
              label="Courses"
              value={selectedCourse}
              options={getOptionsWithAll(dropdownOptions.course)}
              onChange={setSelectedCourse}
              className="w-full"
            />

            <SelectField
              label="Room No"
              value={selectedRoom}
              options={getOptionsWithAll(dropdownOptions.room)}
              onChange={setSelectedRoom}
              className="w-full"
            />

            <SelectField
              label="Invigilator"
              value={selectedInvigilator}
              options={getOptionsWithAll(dropdownOptions.invigilator)}
              onChange={setSelectedInvigilator}
              className="w-full"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredExamData.length > 0 ? (
            <ExamTable data={filteredExamData} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              No exams found matching the selected filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamSchedule;
