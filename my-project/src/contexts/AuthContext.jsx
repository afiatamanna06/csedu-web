import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  GoogleAuthProvider
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

  // Reauthenticate user
  const reauthenticate = async (password) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      // Check if user is signed in with Google
      const isGoogleUser = user.providerData[0].providerId === 'google.com';
      if (isGoogleUser) {
        throw new Error("Google users cannot update their password directly");
      }

      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      console.error("Reauthentication error:", error);
      throw error;
    }
  };

  // Update Profile
  const updateUserProfile = async (profileData) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      console.log("AuthContext: Attempting profile update...");
      await updateProfile(user, profileData);
      console.log("AuthContext: Profile update successful");
      // Update the currentUser state to reflect changes
      setCurrentUser(prevUser => ({ ...prevUser, ...profileData }));
    } catch (error) {
      console.error("AuthContext: Profile update error:", error);
      throw error;
    }
  };

  // Update Email
  const updateUserEmail = async (newEmail, currentPassword) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      // Reauthenticate first if using email/password
      if (user.providerData[0].providerId === 'password') {
        await reauthenticate(currentPassword);
      }

      console.log("AuthContext: Attempting email update...");
      await updateEmail(user, newEmail);
      console.log("AuthContext: Email update successful");
      setCurrentUser(prevUser => ({ ...prevUser, email: newEmail }));
    } catch (error) {
      console.error("AuthContext: Email update error:", error);
      throw error;
    }
  };

  // Update Password
  const updateUserPassword = async (currentPassword, newPassword) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      // Check if user is signed in with Google
      const isGoogleUser = user.providerData[0].providerId === 'google.com';
      if (isGoogleUser) {
        throw new Error("Google users cannot update their password directly");
      }

      // Reauthenticate first
      await reauthenticate(currentPassword);

      console.log("AuthContext: Attempting password update...");
      await updatePassword(user, newPassword);
      console.log("AuthContext: Password update successful");
    } catch (error) {
      console.error("AuthContext: Password update error:", error);
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
    resetPassword,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    reauthenticate
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