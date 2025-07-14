import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      setError("");
      setLoading(true);
      console.log("Starting Google sign up...");
      const result = await signInWithGoogle();
      console.log("Google sign up successful:", result);
      navigate("/");
    } catch (error) {
      console.error("Google sign up error:", error);
      setError("Failed to sign up with Google: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Starting email/password sign up...");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setError("");
      setLoading(true);
      console.log("Attempting to create account with email:", email);
      const result = await signup(email, password);
      console.log("Email/password sign up successful:", result);
      navigate("/");
    } catch (error) {
      console.error("Email/password sign up error:", error);
      let errorMessage = "Failed to create an account: ";
      
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage += "Email is already registered. Please use a different email or try logging in.";
          break;
        case 'auth/invalid-email':
          errorMessage += "Invalid email address format.";
          break;
        case 'auth/operation-not-allowed':
          errorMessage += "Email/password accounts are not enabled. Please contact support.";
          break;
        case 'auth/weak-password':
          errorMessage += "Password is too weak. Please use a stronger password.";
          break;
        default:
          errorMessage += error.message || "Unknown error occurred.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Main Container */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left Side - Image Section */}
          <div className="relative w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full">
              <img
                className="w-full h-64 md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover rounded-lg"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3b1d511b4d8517b7098bfaeb4ac23286c138923?width=1500"
                alt="CSEDU Orientation"
              />
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="relative z-10 w-full lg:w-1/2">
            <div className="bg-white rounded-lg border border-black/10 p-6 md:p-8 shadow-[0px_4px_4px_rgba(0,0,0,0.12)] filter drop-shadow-[0px_4px_4px_rgba(0,0,0,0.49)] max-w-xl mx-auto">
              {/* Form Content */}
              <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col gap-2">
                  <h1 className="font-inter text-2xl md:text-3xl font-bold text-[#101828] leading-tight m-0">Sign Up</h1>
                  <p className="font-inter text-sm md:text-base font-medium text-[#667085] m-0">
                    Please fill your information below
                  </p>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Email Field */}
                  <div className="relative h-14 bg-[#f2f4f7] rounded-[10px] flex items-center pl-4 gap-3">
                    <svg
                      className="w-5 h-5 text-[#98a2b3] flex-shrink-0"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.08856 2.5C2.66109 2.5 1.50391 3.61929 1.50391 5V15C1.50391 16.3807 2.66109 17.5 4.08856 17.5H17.8734C19.3008 17.5 20.458 16.3807 20.458 15V5C20.458 3.61929 19.3008 2.5 17.8734 2.5H4.08856ZM6.36323 6.0265C5.99769 5.73187 5.45443 5.77964 5.14982 6.1332C4.8452 6.48676 4.89459 7.01224 5.26013 7.30687L9.32633 10.5844C10.2848 11.357 11.6771 11.357 12.6356 10.5844L16.7018 7.30687C17.0674 7.01224 17.1168 6.48676 16.8121 6.1332C16.5075 5.77964 15.9643 5.73187 15.5987 6.0265L11.5325 9.30402C11.213 9.56156 10.7489 9.56156 10.4294 9.30403L6.36323 6.0265Z"
                        fill="currentColor"
                      />
                    </svg>
                    <input
                      type="email"
                      className="flex-1 border-none bg-transparent outline-none font-inter text-sm font-medium text-[#101828] pr-4 placeholder-[#98a2b3]"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Student ID Field */}
                  <div className="relative h-14 bg-[#f2f4f7] rounded-[10px] flex items-center pl-4 gap-3">
                    <svg
                      className="w-5 h-5 text-[#98a2b3] flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 20V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V20H4ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
                        fill="currentColor"
                        fillOpacity="0.6"
                      />
                    </svg>
                    <input
                      type="text"
                      className="flex-1 border-none bg-transparent outline-none font-inter text-sm font-medium text-[#101828] pr-4 placeholder-[#98a2b3]"
                      placeholder="Student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative h-14 bg-[#f2f4f7] rounded-[10px] flex items-center pl-4 gap-3">
                    <svg
                      className="w-5 h-5 text-[#98a2b3] flex-shrink-0"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.6246 2.25L21.3746 4.5M21.3746 4.5L24.7496 7.875L20.8121 11.8125L17.4371 8.4375M21.3746 4.5L17.4371 8.4375M12.8133 13.0612C13.3942 13.6344 13.856 14.3168 14.1721 15.0691C14.4881 15.8215 14.6522 16.6289 14.655 17.445C14.6577 18.261 14.499 19.0695 14.188 19.824C13.877 20.5784 13.4198 21.2639 12.8427 21.8409C12.2657 22.4179 11.5802 22.8751 10.8258 23.1862C10.0713 23.4972 9.26283 23.6559 8.44679 23.6532C7.63075 23.6504 6.82331 23.4863 6.07097 23.1702C5.31862 22.8542 4.63623 22.3924 4.06308 21.8115C2.93597 20.6445 2.31231 19.0815 2.32641 17.4592C2.3405 15.8369 2.99124 14.285 4.13845 13.1377C5.28566 11.9905 6.83756 11.3398 8.45991 11.3257C10.0822 11.3116 11.6452 11.9353 12.8122 13.0624L12.8133 13.0612ZM12.8133 13.0612L17.4371 8.4375"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      type="password"
                      className="flex-1 border-none bg-transparent outline-none font-inter text-sm font-medium text-[#101828] pr-4 placeholder-[#98a2b3]"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative h-14 bg-[#f2f4f7] rounded-[10px] flex items-center pl-4 gap-3">
                    <svg
                      className="w-5 h-5 text-[#98a2b3] flex-shrink-0"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.6246 2.25L21.3746 4.5M21.3746 4.5L24.7496 7.875L20.8121 11.8125L17.4371 8.4375M21.3746 4.5L17.4371 8.4375M12.8133 13.0612C13.3942 13.6344 13.856 14.3168 14.1721 15.0691C14.4881 15.8215 14.6522 16.6289 14.655 17.445C14.6577 18.261 14.499 19.0695 14.188 19.824C13.877 20.5784 13.4198 21.2639 12.8427 21.8409C12.2657 22.4179 11.5802 22.8751 10.8258 23.1862C10.0713 23.4972 9.26283 23.6559 8.44679 23.6532C7.63075 23.6504 6.82331 23.4863 6.07097 23.1702C5.31862 22.8542 4.63623 22.3924 4.06308 21.8115C2.93597 20.6445 2.31231 19.0815 2.32641 17.4592C2.3405 15.8369 2.99124 14.285 4.13845 13.1377C5.28566 11.9905 6.83756 11.3398 8.45991 11.3257C10.0822 11.3116 11.6452 11.9353 12.8122 13.0624L12.8133 13.0612ZM12.8133 13.0612L17.4371 8.4375"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      type="password"
                      className="flex-1 border-none bg-transparent outline-none font-inter text-sm font-medium text-[#101828] pr-4 placeholder-[#98a2b3]"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#13274d] text-white font-inter text-base font-medium rounded-lg hover:bg-[#0f1f3d] transition-colors disabled:opacity-50"
                  >
                    <span>Sign Up</span>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 17L14.5 12L9.5 7"
                        stroke="currentColor"
                        strokeWidth="2.03636"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </form>

                {/* Google Sign Up Button */}
                <button
                  onClick={handleGoogleSignUp}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-white border border-[#d0d5dd] rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <img
                    className="w-6 h-6"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/00e7f645209f87b6b205bee165e301e40b910486?width=100"
                    alt="Google"
                  />
                  <span className="font-inter text-base font-medium text-[#344054]">
                    Sign up with Google
                  </span>
                </button>

                {/* Login Link */}
                <p className="text-center font-inter text-sm text-[#344054]">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-[#13274d] hover:text-[#0f1f3d]">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
