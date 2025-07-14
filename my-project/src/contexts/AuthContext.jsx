import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email/Password Sign Up
  const signup = async (email, password) => {
    try {
      console.log("AuthContext: Attempting email/password signup...");
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("AuthContext: Email/password signup successful:", result);
      return result;
    } catch (error) {
      console.error("AuthContext: Email/password signup error:", error);
      throw error;
    }
  };

  // Email/Password Sign In
  const login = async (email, password) => {
    try {
      console.log("AuthContext: Attempting email/password login...");
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("AuthContext: Email/password login successful:", result);
      return result;
    } catch (error) {
      console.error("AuthContext: Email/password login error:", error);
      throw error;
    }
  };

  // Google Sign In
  const signInWithGoogle = async () => {
    try {
      console.log("AuthContext: Attempting Google sign in...");
      const result = await signInWithPopup(auth, googleProvider);
      console.log("AuthContext: Google sign in successful:", result);
      return result;
    } catch (error) {
      console.error("AuthContext: Google sign in error:", error);
      throw error;
    }
  };

  // Sign Out
  const logout = async () => {
    try {
      console.log("AuthContext: Attempting sign out...");
      await signOut(auth);
      console.log("AuthContext: Sign out successful");
    } catch (error) {
      console.error("AuthContext: Sign out error:", error);
      throw error;
    }
  };

  // Password Reset
  const resetPassword = async (email) => {
    try {
      console.log("AuthContext: Attempting password reset...");
      await sendPasswordResetEmail(auth, email);
      console.log("AuthContext: Password reset email sent");
    } catch (error) {
      console.error("AuthContext: Password reset error:", error);
      throw error;
    }
  };

  useEffect(() => {
    console.log("AuthContext: Setting up auth state listener...");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("AuthContext: Auth state changed:", user ? "User logged in" : "No user");
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    signInWithGoogle,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 