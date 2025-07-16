import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

export default function UserManagement() {
  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [session, setSession] = useState('');
  const [hall, setHall] = useState('');
  const [degree, setDegree] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { addStudent, addTeacher } = useAuth();

  // ✅ Add debug useEffect
  useEffect(() => {
    console.log('🔍 UserManagement mounted');
    console.log('🔍 Token in localStorage:', localStorage.getItem('token'));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    // ✅ Add debug logging before making request
    console.log('🔍 Submitting form...');
    console.log('🔍 Token at submit:', localStorage.getItem('token'));

    try {
      setError('');
      setSuccess('');
      setLoading(true);

      if (userType === 'student') {
        const studentData = {
          email,
          name,
          registration_number: registrationNumber,
          semester,
          session,
          hall,
          degree
        };
        const result = await addStudent(studentData);
        setSuccess(result.message);
      } else {
        const teacherData = {
          email,
          name,
          registration_number: registrationNumber,
          department
        };
        const result = await addTeacher(teacherData);
        setSuccess(result.message);
      }

      // Clear form
      setEmail('');
      setName('');
      setRegistrationNumber('');
      setSemester('');
      setSession('');
      setHall('');
      setDegree('');
      setDepartment('');
    } catch (error) {
      setError(error.message || 'Failed to add user');
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Add New User
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Add students or teachers to the system
          </p>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* User Type Selection */}
            <div>
              <label htmlFor="user-type" className="block text-sm font-medium text-gray-700">User Type</label>
              <select
                id="user-type"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Full Name"
              />
            </div>

            {/* Registration Number */}
            <div>
              <label htmlFor="registration-number" className="block text-sm font-medium text-gray-700">Registration Number</label>
              <input
                id="registration-number"
                name="registration-number"
                type="text"
                required
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Registration Number"
              />
            </div>

            {/* Student specific fields */}
            {userType === 'student' && (
              <>
                <div>
                  <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
                  <input
                    id="semester"
                    name="semester"
                    type="text"
                    required
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., 1st, 2nd, 3rd..."
                  />
                </div>

                <div>
                  <label htmlFor="session" className="block text-sm font-medium text-gray-700">Session</label>
                  <input
                    id="session"
                    name="session"
                    type="text"
                    required
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., 2023-2024"
                  />
                </div>

                <div>
                  <label htmlFor="hall" className="block text-sm font-medium text-gray-700">Hall</label>
                  <input
                    id="hall"
                    name="hall"
                    type="text"
                    required
                    value={hall}
                    onChange={(e) => setHall(e.target.value)}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Hall name"
                  />
                </div>

                <div>
                  <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree</label>
                  <input
                    id="degree"
                    name="degree"
                    type="text"
                    required
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., BSc in CSE"
                  />
                </div>
              </>
            )}

            {/* Teacher specific fields */}
            {userType === 'teacher' && (
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Department name"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : `Add ${userType}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}