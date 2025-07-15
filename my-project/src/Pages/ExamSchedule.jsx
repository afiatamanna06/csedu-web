import { useState, useEffect } from "react";
import SelectField from "../components/SelectField";
import ExamTable from "../components/ExamTable";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const ExamSchedule = () => {
  const [selectedSemester, setSelectedSemester] = useState("4th year - 1st Semester");
  const [selectedCourse, setSelectedCourse] = useState("Artificial Intelligence");
  const [selectedRoom, setSelectedRoom] = useState("3rd floor : 412");
  const [selectedInvigilator, setSelectedInvigilator] = useState("All");
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // Add "All" option to dropdowns
  const getOptionsWithAll = (options) => ["All", ...options];

  // Fetch exams from backend when filters change
  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      setError("");
      try {
        const params = {};
        if (selectedSemester !== "All") params.semester = selectedSemester;
        if (selectedRoom !== "All") params.room_no = selectedRoom.split(" : ")[1];
        if (selectedInvigilator !== "All") params.invigilator = selectedInvigilator;
        if (selectedCourse !== "All") params.course_title = selectedCourse;
        const response = await axios.get(`${API_BASE_URL}/exam/filter`, { params });
        // Map backend data to ExamTable format
        const mapped = response.data.map((exam) => ({
          date: exam.date,
          time: exam.start_time ? `${exam.start_time.substring(0,5)} - ${exam.end_time ? exam.end_time.substring(0,5) : ''}` : '',
          courseCode: exam.course && exam.course.code ? exam.course.code : '',
          courseName: exam.course && exam.course.title ? exam.course.title : '',
          roomNo: exam.room_no,
          invigilator: exam.invigilator,
          semester: exam.semester
        }));
        setExamData(mapped);
      } catch (err) {
        setError("Failed to fetch exam schedule.");
        setExamData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, [selectedSemester, selectedCourse, selectedRoom, selectedInvigilator]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container with max width and center alignment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8">
          <div className="text-center w-full">
            <h1 className="text-4xl font-medium text-gray-900 font-poppins">
              Exam Schedule
            </h1>
            <p className="mt-2 text-sm text-gray-600 font-inter">
              Welcome to our exam scheduling system
            </p>
          </div>
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
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading exam schedule...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : examData.length > 0 ? (
            <ExamTable 
              data={examData} 
              onUpdate={undefined}
              onDelete={undefined}
            />
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
