import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://localhost:8000';

interface User {
  id: string;
  role: string;
}

export type UserRole = 'student' | 'teacher' | 'admin';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string; role: UserRole }) => Promise<any>;
  studentSignup: (signupData: any) => Promise<any>;
  teacherSignup: (signupData: any) => Promise<any>;
  adminSignup: (signupData: any) => Promise<any>;
  addStudent: (studentData: any) => Promise<any>;
  addTeacher: (teacherData: any) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<{ id: string; role: string; exp: number }>(token);
        if (decoded.exp * 1000 > Date.now()) {
          setCurrentUser({
            id: decoded.id,
            role: decoded.role
          });
        } else {
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

  const login = async (credentials: { email: string; password: string; role: UserRole }) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', credentials.email);
      formData.append('password', credentials.password);
      formData.append('role', credentials.role);

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

      const decoded = jwtDecode<{ id: string; role: string }>(data.access_token);
      
      // Verify that the token's role matches the requested role
      if (decoded.role.toLowerCase() !== credentials.role) {
        throw new Error('Account type does not match selected role');
      }
      
      localStorage.setItem('token', data.access_token);
      
      const userInfo = {
        id: decoded.id,
        role: decoded.role
      };
      
      setCurrentUser(userInfo);
      
      return {
        ...data,
        ...userInfo
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const studentSignup = async (signupData: any) => {
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

      if (data.access_token) {
        const decoded = jwtDecode<{ id: string; role: string }>(data.access_token);
        localStorage.setItem('token', data.access_token);
        
        const userInfo = {
          id: decoded.id,
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

  const teacherSignup = async (signupData: any) => {
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

      if (data.access_token) {
        const decoded = jwtDecode<{ id: string; role: string }>(data.access_token);
        localStorage.setItem('token', data.access_token);
        
        const userInfo = {
          id: decoded.id,
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

  const adminSignup = async (signupData: any) => {
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

      if (data.access_token) {
        const decoded = jwtDecode<{ id: string; role: string }>(data.access_token);
        localStorage.setItem('token', data.access_token);
        
        const userInfo = {
          id: decoded.id,
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
      console.error('Admin signup error:', error);
      throw error;
    }
  };

  const addStudent = async (studentData: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/admin/add/student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(studentData),
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

  const addTeacher = async (teacherData: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/admin/add/teacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(teacherData),
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

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
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

export default AuthContext; 