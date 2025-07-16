import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function UserManagement() {
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    registrationNumber: '',
    semester: '',
    session: '',
    hall: '',
    degree: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { addStudent, addTeacher } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      email: '',
      name: '',
      registrationNumber: '',
      semester: '',
      session: '',
      hall: '',
      degree: '',
      department: ''
    });
    setError('');
    setSuccess('');
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError('');
      setSuccess('');
      setLoading(true);

      if (userType === 'student') {
        const studentData = {
          email: formData.email,
          name: formData.name,
          registration_number: formData.registrationNumber,
          semester: formData.semester,
          session: formData.session,
          hall: formData.hall,
          degree: formData.degree
        };
        const result = await addStudent(studentData);
        setSuccess(result.message || 'Student added successfully');
      } else {
        const teacherData = {
          email: formData.email,
          name: formData.name,
          registration_number: formData.registrationNumber,
          department: formData.department
        };
        const result = await addTeacher(teacherData);
        setSuccess(result.message || 'Teacher added successfully');
      }

      resetForm();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add user');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2B1472]">
            Add New User
          </CardTitle>
          <CardDescription>
            Add students or teachers to the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 text-green-700 border-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* User Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="user-type">User Type</Label>
                <Select
                  value={userType}
                  onValueChange={(value: 'student' | 'teacher') => {
                    setUserType(value);
                    resetForm();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Common Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    name="registrationNumber"
                    required
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Registration Number"
                    className="bg-white"
                  />
                </div>
              </div>

              {/* Student Specific Fields */}
              {userType === 'student' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Input
                        id="semester"
                        name="semester"
                        required
                        value={formData.semester}
                        onChange={handleChange}
                        placeholder="e.g., 1st, 2nd, 3rd..."
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="session">Session</Label>
                      <Input
                        id="session"
                        name="session"
                        required
                        value={formData.session}
                        onChange={handleChange}
                        placeholder="e.g., 2023-2024"
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hall">Hall</Label>
                    <Input
                      id="hall"
                      name="hall"
                      required
                      value={formData.hall}
                      onChange={handleChange}
                      placeholder="Hall name"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      name="degree"
                      required
                      value={formData.degree}
                      onChange={handleChange}
                      placeholder="e.g., BSc in CSE"
                      className="bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Teacher Specific Fields */}
              {userType === 'teacher' && (
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Department name"
                    className="bg-white"
                  />
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2B1472] hover:bg-[#1a0c45] text-white"
            >
              {loading ? 'Adding...' : `Add ${userType}`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 