import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import image from "../assets/images/hero-2.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://studyhub-api-p0q4.onrender.com/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Authentication data missing from server response");
      }

      // Normalize user data to ensure consistent structure
      const normalizedUser = {
        ...user,
        _id: user._id || user.id, // Standardize on _id
        role: user.role || "student", // Default role if not provided
      };

      // Store authentication data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(normalizedUser));

      // Handle redirection based on role
      if (normalizedUser.role === "tutor") {
        localStorage.setItem("tutorId", normalizedUser._id);
        navigate(
          user.photo?.includes("ui-avatars.com")
            ? "/tutor/profile"
            : "/tutordash"
        );
      } else {
        navigate("/studentdash");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please try again."
      );
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background image with enhanced overlay */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Mountain landscape background"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
          }}
        />
        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-indigo-900/80"></div>
        {/* Additional pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-60 h-60 bg-white rounded-full -translate-x-30 -translate-y-30"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-white rounded-full translate-x-40 -translate-y-40"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-white rounded-full translate-y-48"></div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-60 right-40 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-40 left-60 w-5 h-5 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>

      {/* Back button */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={goBack}
          className="group bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-2xl hover:bg-white/30 transition-all duration-300 border border-white/20 hover:scale-110"
          aria-label="Go back to home"
        >
          <ArrowLeft size={24} className="text-white group-hover:text-blue-100 transition-colors duration-300" />
        </button>
      </div>

      {/* Login form */}
      <div className="relative z-10 w-full max-w-lg mx-6">
        {/* Decorative gradient border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-3xl blur opacity-30"></div>
        
        <div className="relative bg-white/95 backdrop-blur-lg p-10 md:p-12 shadow-2xl rounded-3xl border border-white/20">
          {/* Header section */}
          <div className="text-center mb-10">
            <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-base font-bold mb-6 shadow-lg border border-blue-200/50">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🔐 Welcome Back
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Sign In to Your Account
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Continue your learning journey with us
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-8 p-6 bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 text-red-700 rounded-2xl shadow-lg">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-base font-medium">{error}</p>
              </div>
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Email field */}
            <div>
              <label className="block text-base font-bold text-gray-800 mb-3">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-lg bg-gray-50/50 hover:bg-white"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-base font-bold text-gray-800 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-lg bg-gray-50/50 hover:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6" />
                  ) : (
                    <Eye className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-xl py-5 rounded-2xl transition-all duration-300 shadow-2xl ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:shadow-3xl transform hover:-translate-y-1"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-4 h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing you in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-8 text-center space-y-4">
            <div className="text-base text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 font-bold hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors duration-300"
              >
                Sign Up
              </a>
            </div>
            
            <a
              href="/forgot-password"
              className="block text-blue-600 font-bold hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors duration-300"
            >
              Forgot your password?
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-8 text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">Secure Login</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <span className="text-sm font-medium">10K+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;