import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      setError('Failed to reset password. Please check your email address.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full max-w-7xl mx-auto">
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
              <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col gap-2">
                  <h1 className="font-inter text-2xl md:text-3xl font-bold text-[#101828] leading-tight m-0">
                    Password Reset
                  </h1>
                  <p className="font-inter text-sm md:text-base font-medium text-[#667085] m-0">
                    Enter your email address to reset your password
                  </p>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {message}
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
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#13274d] text-white font-inter text-base font-medium rounded-lg hover:bg-[#0f1f3d] transition-colors disabled:opacity-50"
                  >
                    Reset Password
                  </button>
                </form>

                <div className="flex flex-col gap-4 text-center">
                  <Link
                    to="/login"
                    className="font-inter text-sm font-medium text-[#13274d] hover:text-[#0f1f3d]"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 