import { useState, useMemo } from "react";
import SelectField from "../components/SelectField";
import ExamTable from "../components/ExamTable";

const ExamSchedule = () => {
  const [selectedSemester, setSelectedSemester] = useState("4th year - 1st Semester");
  const [selectedCourse, setSelectedCourse] = useState("Artificial Intelligence");
  const [selectedRoom, setSelectedRoom] = useState("3rd floor : 412");
  const [selectedInvigilator, setSelectedInvigilator] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    courseCode: '',
    courseName: '',
    roomNo: '',
    invigilator: '',
    semester: ''
  });

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
  const [examData, setExamData] = useState([
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
  ]);

  // Filter the exam data based on selected options
  const filteredExamData = useMemo(() => {
    return examData.filter(exam => {
      const matchesSemester = selectedSemester === "All" || exam.semester === selectedSemester;
      const matchesCourse = selectedCourse === "All" || exam.courseName === selectedCourse;
      const matchesRoom = selectedRoom === "All" || exam.roomNo === selectedRoom.split(" : ")[1];
      const matchesInvigilator = selectedInvigilator === "All" || exam.invigilator === selectedInvigilator;
      
      return matchesSemester && matchesCourse && matchesRoom && matchesInvigilator;
    });
  }, [selectedSemester, selectedCourse, selectedRoom, selectedInvigilator, examData]);

  // Add "All" option to dropdowns
  const getOptionsWithAll = (options) => ["All", ...options];

  const handleUpdate = (exam) => {
    setFormData(exam);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (exam) => {
    setExamData(examData.filter(e => 
      e.courseCode !== exam.courseCode || 
      e.date !== exam.date || 
      e.time !== exam.time
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setExamData(examData.map(exam => 
        (exam.courseCode === formData.courseCode && 
         exam.date === formData.date && 
         exam.time === formData.time) ? formData : exam
      ));
    } else {
      setExamData([...examData, formData]);
    }
    setShowForm(false);
    setIsEditing(false);
    setFormData({
      date: '',
      time: '',
      courseCode: '',
      courseName: '',
      roomNo: '',
      invigilator: '',
      semester: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container with max width and center alignment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section with Add Button */}
        <header className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-medium text-gray-900 font-poppins">
              Exam Schedule
            </h1>
            <p className="mt-2 text-sm text-gray-600 font-inter">
              Welcome to our exam scheduling system
            </p>
          </div>
          <button
            onClick={() => {
              setIsEditing(false);
              setFormData({
                date: '',
                time: '',
                courseCode: '',
                courseName: '',
                roomNo: '',
                invigilator: '',
                semester: ''
              });
              setShowForm(true);
            }}
            className="px-4 py-2 bg-[#13274C] text-white rounded-lg hover:bg-[#1e3a5f] transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Exam</span>
          </button>
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
            <ExamTable 
              data={filteredExamData} 
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              No exams found matching the selected filters
            </div>
          )}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#13274C]">
                  {isEditing ? 'Update Exam' : 'Add New Exam'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                    <input
                      type="text"
                      value={formData.courseCode}
                      onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                    <select
                      value={formData.courseName}
                      onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="">Select Course</option>
                      {dropdownOptions.course.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room No</label>
                    <select
                      value={formData.roomNo}
                      onChange={(e) => setFormData({...formData, roomNo: e.target.value.split(" : ")[1]})}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="">Select Room</option>
                      {dropdownOptions.room.map(room => (
                        <option key={room} value={room}>{room}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invigilator</label>
                    <select
                      value={formData.invigilator}
                      onChange={(e) => setFormData({...formData, invigilator: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="">Select Invigilator</option>
                      {dropdownOptions.invigilator.map(invigilator => (
                        <option key={invigilator} value={invigilator}>{invigilator}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                    <select
                      value={formData.semester}
                      onChange={(e) => setFormData({...formData, semester: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="">Select Semester</option>
                      {dropdownOptions.semester.map(semester => (
                        <option key={semester} value={semester}>{semester}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#13274C] text-white rounded-lg hover:bg-[#1e3a5f]"
                  >
                    {isEditing ? 'Update Exam' : 'Add Exam'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamSchedule;
