import { useState } from "react";

// Save (Checkmark) Icon
const SaveIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-check"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Cancel (X) Icon
const CancelIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-x"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Edit Icon
const EditIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-edit-2"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const GradeTable = ({ data, onGradeUpdate }) => {
  const [editingStudent, setEditingStudent] = useState(null);
  const [editGrade, setEditGrade] = useState("");

  // Predefined grade options
  const gradeOptions = [
    "A+", "A", "A-",
    "B+", "B", "B-",
    "C+", "C", "C-",
    "D+", "D", "D-",
    "F"
  ];

  const handleEditClick = (student) => {
    setEditingStudent(student.id);
    setEditGrade(student.grade);
  };

  const handleSaveEdit = (studentId) => {
    if (editGrade) {
      onGradeUpdate(studentId, editGrade);
      setEditingStudent(null);
      setEditGrade("");
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setEditGrade("");
  };

  const handleKeyPress = (e, studentId) => {
    if (e.key === "Enter") {
      handleSaveEdit(studentId);
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-[#FFC300]">
          <th className="text-left py-3 px-6 text-sm font-semibold" style={{ width: '25%' }}>Student ID</th>
          <th className="text-left py-3 px-6 text-sm font-semibold" style={{ width: '35%' }}>Student Name</th>
          <th className="text-left py-3 px-6 text-sm font-semibold" style={{ width: '25%' }}>Grade</th>
          <th className="text-left py-3 px-6 text-sm font-semibold" style={{ width: '15%' }}>Edit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((student) => (
          <tr key={student.id} className="border-b border-gray-100">
            <td className="py-3 px-6 text-sm text-gray-500 text-left">{student.id}</td>
            <td className="py-3 px-6 text-sm text-gray-600 text-left">{student.name}</td>
            <td className="py-3 px-6 text-sm text-left">
              {editingStudent === student.id ? (
                <select
                  value={editGrade}
                  onChange={(e) => setEditGrade(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, student.id)}
                  autoFocus
                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="" disabled>Select</option>
                  {gradeOptions.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-gray-600">{student.grade}</span>
              )}
            </td>
            <td className="py-3 px-6 text-sm text-left">
              {editingStudent === student.id ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSaveEdit(student.id)}
                    className="text-green-600 hover:text-green-800 transition-colors"
                    title="Save"
                  >
                    <SaveIcon />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    title="Cancel"
                  >
                    <CancelIcon />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditClick(student)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Edit"
                >
                  <EditIcon />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GradeTable;
