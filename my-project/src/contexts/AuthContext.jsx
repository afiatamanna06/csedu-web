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
          id: decoded.id,  // ✅ Map user_id to id
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
    
    // ✅ Map backend fields to frontend expected fields
    const userInfo = {
      id: decoded.id,  // Map user_id to id
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

 // Student signup
const studentSignup = async (signupData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/student/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(signupData),
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
      throw new Error(data.detail || 'Student signup failed');
    }

    // ✅ Handle token if provided
    if (data.access_token) {
      const decoded = jwtDecode(data.access_token);
      localStorage.setItem('token', data.access_token);
      
      const userInfo = {
        id: decoded.id,  // ✅ Map user_id to id
        role: decoded.role
      };
      
      setCurrentUser(userInfo);
      
      return {
        ...data,
        ...userInfo
      };
    }

    return data;
  } catch (error) {
    console.error('Student signup error:', error);
    throw error;
  }
};

// Teacher signup
const teacherSignup = async (signupData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teacher/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(signupData),
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
      throw new Error(data.detail || 'Teacher signup failed');
    }

    // ✅ Handle token if provided
    if (data.access_token) {
      const decoded = jwtDecode(data.access_token);
      localStorage.setItem('token', data.access_token);
      
      const userInfo = {
        id: decoded.id,  // ✅ Map user_id to id
        role: decoded.role
      };
      
      setCurrentUser(userInfo);
      
      return {
        ...data,
        ...userInfo
      };
    }

    return data;
  } catch (error) {
    console.error('Teacher signup error:', error);
    throw error;
  }
};


// Admin signup
const adminSignup = async (signupData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(signupData),
    });

    const text = await response.text();
    console.log('Admin signup response:', text); // Debug log
    
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Response parsing error:', parseError);
      throw new Error('Invalid response from server');
    }
    
    if (!response.ok) {
      throw new Error(data.detail || 'Admin signup failed');
    }

    console.log('Admin signup data:', data); // Debug log

    // ✅ Handle token - your backend returns 'access_token' not 'data.access_token'
    if (data.access_token) {
      console.log('Token received:', data.access_token); // Debug log
      
      // Decode token to get user info
      const decoded = jwtDecode(data.access_token);
      console.log('Decoded token:', decoded); // Debug log
      
      // Store token
      localStorage.setItem('token', data.access_token);
      
      // ✅ Map backend fields to frontend expected fields
      // Your backend uses 'user_id' but frontend expects 'id'
      const userInfo = {
        id: decoded.id,  // Map user_id to id
        role: decoded.role
      };
      
      setCurrentUser(userInfo);
      
      return {
        ...data,
        ...userInfo
      };
    } else {
      console.warn('No access_token in admin signup response'); // Debug
    }

    return data;
  } catch (error) {
    console.error('Admin signup error:', error);
    throw error;
  }
};

// Add student (admin only)
const addStudent = async (studentData) => {
  try {
    const token = localStorage.getItem('token');
    
    console.log('🔍 DEBUG: Starting addStudent...');
    console.log('🔍 Token exists:', !!token);
    
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }

    console.log('🔍 Token length:', token.length);
    console.log('🔍 Token preview:', token.substring(0, 50) + '...');
    
    // Decode and validate token
    try {
      const decoded = jwtDecode(token);
      console.log('🔍 Decoded token:', decoded);
      console.log('🔍 Token role:', decoded.role);
      console.log('🔍 Token user_id:', decoded.id); 
      console.log('🔍 Token expires at:', new Date(decoded.exp * 1000));
      console.log('🔍 Current time:', new Date());
      console.log('🔍 Is token expired?', decoded.exp * 1000 < Date.now());
      
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error('Token has expired');
      }
    } catch (decodeError) {
      console.error('🔍 Token decode error:', decodeError);
      throw new Error('Invalid token format');
    }

    console.log('🔍 Making request to:', `${API_BASE_URL}/admin/add/student`);
    
    // ✅ Updated request body to include ALL required fields
    const requestBody = {
      email: studentData.email,
      registration_number: studentData.registration_number,
      name: studentData.name,
      semester: studentData.semester,
      session: studentData.session,     // ✅ Add this
      hall: studentData.hall,           // ✅ Add this
      degree: studentData.degree        // ✅ Add this
    };
    
    console.log('🔍 Request body:', requestBody);

    const response = await fetch(`${API_BASE_URL}/admin/add/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),  // ✅ Use the complete request body
    });

    console.log('🔍 Response status:', response.status);
    console.log('🔍 Response status text:', response.statusText);

    const text = await response.text();
    console.log('🔍 Response text:', text);
    
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Response parsing error:', parseError);
      throw new Error('Invalid response from server');
    }
    
    if (!response.ok) {
      console.error('🔍 Request failed!');
      console.error('🔍 Error details:', data);
      throw new Error(data.detail || 'Failed to add student');
    }

    console.log('🔍 Success!');
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
    
    console.log('🔍 DEBUG: Starting addTeacher...');
    console.log('🔍 Token exists:', !!token);
    
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }

    console.log('🔍 Token length:', token.length);
    console.log('🔍 Token preview:', token.substring(0, 50) + '...');
    
    // Decode and validate token
    try {
      const decoded = jwtDecode(token);
      console.log('🔍 Decoded token:', decoded);
      console.log('🔍 Token role:', decoded.role);
      console.log('🔍 Token user_id:', decoded.id);
      console.log('🔍 Token expires at:', new Date(decoded.exp * 1000));
      console.log('🔍 Current time:', new Date());
      console.log('🔍 Is token expired?', decoded.exp * 1000 < Date.now());
      
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error('Token has expired');
      }
    } catch (decodeError) {
      console.error('🔍 Token decode error:', decodeError);
      throw new Error('Invalid token format');
    }

    console.log('🔍 Making request to:', `${API_BASE_URL}/admin/add/teacher`);
    
    // ✅ Request body with all required fields for teacher
    const requestBody = {
      email: teacherData.email,
      name: teacherData.name,
      registration_number: teacherData.registration_number,
      department: teacherData.department
    };
    
    console.log('🔍 Request body:', requestBody);

    const response = await fetch(`${API_BASE_URL}/admin/add/teacher`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('🔍 Response status:', response.status);
    console.log('🔍 Response status text:', response.statusText);

    const text = await response.text();
    console.log('🔍 Response text:', text);
    
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Response parsing error:', parseError);
      throw new Error('Invalid response from server');
    }
    
    if (!response.ok) {
      console.error('🔍 Request failed!');
      console.error('🔍 Error details:', data);
      throw new Error(data.detail || 'Failed to add teacher');
    }

    console.log('🔍 Success!');
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
    studentSignup, 
    teacherSignup,
    adminSignup,
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