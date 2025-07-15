import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://localhost:8000';

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if token exists on mount and decode it
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 > Date.now()) {
          setCurrentUser({
            id: decoded.id,
            role: decoded.role
          });
        } else {
          // Token expired, clean up
          localStorage.removeItem('token');
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Token decode error:', error);
        localStorage.removeItem('token');
        setCurrentUser(null);
      }
    }
    setLoading(false);
  }, []);

  // Universal login for all user types
  const login = async (credentials) => {
    try {
      // Convert request body to form data format
      const formData = new URLSearchParams();
      formData.append('username', credentials.email);  // OAuth2 form expects 'username'
      formData.append('password', credentials.password);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: formData
      });

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Response parsing error:', parseError);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        throw new Error(data.detail || `Failed to login (${response.status})`);
      }

      if (!data.access_token) {
        throw new Error('No access token received from server');
      }

      // Decode token to get user info
      const decoded = jwtDecode(data.access_token);
      
      // Store token
      localStorage.setItem('token', data.access_token);
      
      // Set current user from decoded token
      const userInfo = {
        id: decoded.id,
        role: decoded.role
      };
      
      setCurrentUser(userInfo);
      
      return {
        ...data,
        ...userInfo // Include decoded info in the result
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Add student (admin only)
  const addStudent = async (studentData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await fetch(`${API_BASE_URL}/admin/add/student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: studentData.email,
          registration_number: studentData.registration_number,
          name: studentData.name,
          semester: studentData.semester
        }),
      });

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Response parsing error:', parseError);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to add student');
      }

      return data;
    } catch (error) {
      console.error('Add student error:', error);
      throw error;
    }
  };

  // Add teacher (admin only)
  const addTeacher = async (teacherData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await fetch(`${API_BASE_URL}/admin/add/teacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: teacherData.email,
          name: teacherData.name,
          registration_number: teacherData.registration_number,
          department: teacherData.department
        }),
      });

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Response parsing error:', parseError);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to add teacher');
      }

      return data;
    } catch (error) {
      console.error('Add teacher error:', error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    addStudent,
    addTeacher,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 