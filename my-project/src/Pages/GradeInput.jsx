import { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';

const GradeInput = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form fields for creating result
  const [semester, setSemester] = useState('');
  const [grade, setGrade] = useState('');
  const [studentId, setStudentId] = useState('');
  const [courseCode, setCourseCode] = useState('');
  
  // Course options from backend
  const [courseOptions, setCourseOptions] = useState([]);
  
  // Results data
  const [results, setResults] = useState([]);
  const [fetchStudentId, setFetchStudentId] = useState('');
  
  // API base URL
  const API_BASE_URL = 'http://localhost:8000';

  // Function to get authorization headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      setCoursesLoading(true);
      const response = await fetch(`${API_BASE_URL}/course/list?page_size=100`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch courses');
      }

      const data = await response.json();
      setCourseOptions(data.courses || []);
    } catch (error) {
      console.error('Fetch courses error:', error);
      setError(error.message || 'Failed to fetch courses');
    } finally {
      setCoursesLoading(false);
    }
  };

  // Access Control - Only teachers and admins can access this page
  if (!currentUser || !['Teacher', 'Admin'].includes(currentUser.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You must be logged in as a teacher or admin to access grade input.</p>
        </div>
      </div>
    );
  }

  // Fetch courses when component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Create result via API
  const createResult = async (resultData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/results/create`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(resultData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create result');
      }

      return await response.json();
    } catch (error) {
      console.error('Create result error:', error);
      throw error;
    }
  };

  // Fetch results for a student
  const fetchResults = async (studentRegistrationNumber) => {
    try {
      setResultsLoading(true);
      const response = await fetch(`${API_BASE_URL}/results/${studentRegistrationNumber}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch results');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Fetch results error:', error);
      setError(error.message || 'Failed to fetch results');
      setResults([]);
    } finally {
      setResultsLoading(false);
    }
  };

  // Handle create result form submission
  const handleCreateResult = async (e) => {
    e.preventDefault();
    
    if (!semester || !grade || !studentId || !courseCode) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const resultData = {
        semester: semester.trim(),
        grade: grade.trim(),
        student_id: studentId.trim(),
        course_code: courseCode.trim()
      };

      await createResult(resultData);
      
      setSuccess('Result created successfully!');
      
      // Clear form
      setSemester('');
      setGrade('');
      setStudentId('');
      setCourseCode('');

    } catch (error) {
      console.error('Create result error:', error);
      setError(error.message || 'Failed to create result. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle fetch results
  const handleFetchResults = async (e) => {
    e.preventDefault();
    
    if (!fetchStudentId.trim()) {
      setError('Please enter a student registration number');
      return;
    }

    await fetchResults(fetchStudentId.trim());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {(error || success) && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
            success 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {success ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium">{success || error}</span>
          </div>
        )}

        <header className="text-center mb-8">
          <h1 className="text-4xl font-medium text-black mb-2">Grade Input</h1>
        </header>

        {/* Create Result Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create New Result</h2>
          
          <form onSubmit={handleCreateResult} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student ID */}
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                  Student Registration Number
                </label>
                <input
                  type="text"
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter student registration number"
                  required
                />
              </div>

              {/* Course Code */}
              <div>
                <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Course Code
                </label>
                <div className="relative">
                  <select
                    id="courseCode"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    required
                    disabled={coursesLoading}
                  >
                    <option value="">
                      {coursesLoading ? 'Loading courses...' : 'Select course code'}
                    </option>
                    {courseOptions.map((course) => (
                      <option key={course.id} value={course.code}>
                        {course.code} - {course.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    {coursesLoading ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Semester */}
              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                  Semester
                </label>
                <input
                  type="text"
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 4th year - 1st Semester"
                  required
                />
              </div>

              {/* Grade */}
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                  Grade
                </label>
                <select
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  required
                >
                  <option value="">Select grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || coursesLoading}
                className={`px-6 py-3 rounded-lg shadow-sm transition-colors ${
                  loading || coursesLoading
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-[#13274D] text-white hover:bg-[#0f1f3a]'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
                    Creating...
                  </>
                ) : (
                  'Create Result'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Fetch Results Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">View Student Results</h2>
          
          <form onSubmit={handleFetchResults} className="mb-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="fetchStudentId" className="block text-sm font-medium text-gray-700 mb-2">
                  Student Registration Number
                </label>
                <input
                  type="text"
                  id="fetchStudentId"
                  value={fetchStudentId}
                  onChange={(e) => setFetchStudentId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter student registration number"
                  required
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={resultsLoading}
                  className={`px-6 py-2 rounded-lg shadow-sm transition-colors ${
                    resultsLoading
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {resultsLoading ? 'Loading...' : 'Fetch Results'}
                </button>
              </div>
            </div>
          </form>

          {/* Results Table */}
          {results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Course Code</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Semester</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Grade</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Student ID</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{result.course_code}</td>
                      <td className="border border-gray-300 px-4 py-2">{result.semester}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          ['A+', 'A'].includes(result.grade) ? 'bg-green-100 text-green-800' :
                          ['B+', 'B'].includes(result.grade) ? 'bg-blue-100 text-blue-800' :
                          ['C+', 'C'].includes(result.grade) ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {result.grade}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{result.student_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No results found. Enter a student registration number and click "Fetch Results" to view their grades.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradeInput;
