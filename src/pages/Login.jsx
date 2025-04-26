import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          timeout: 10000
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
        role: user.role || "student" // Default role if not provided
      };

      // Store authentication data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(normalizedUser));

      // Handle redirection based on role
      if (normalizedUser.role === "tutor") {
        localStorage.setItem("tutorId", normalizedUser._id);
        navigate(user.photo?.includes("ui-avatars.com") ? "/tutor/profile" : "/tutordash");
      } else {
        navigate("/studentdash");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || "Login failed. Please try again.");
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Logging in...
              </span>
            ) : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;