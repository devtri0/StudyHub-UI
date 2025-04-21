import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const res = await fetch("https://studyhub-api-p0q4.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Login failed. Try again.");
        return;
      }

      const { token, user } = data;

      if (!token || !user) {
        throw new Error("Missing token or user information from server");
      }

      // Store token for API usage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Tutor redirection logic
      if (user.role === "tutor") {
        const tutorId = user.id || user._id;

        if (!tutorId) throw new Error("Tutor ID is missing");

        localStorage.setItem("tutorId", tutorId);

        
        const isDefaultAvatar = user.photo?.includes("ui-avatars.com");

        if (isDefaultAvatar) {
          navigate("/tutor/profile"); 
        } else {
          navigate("/tutordash"); 
        }
      } else {
        // For regular users
        navigate("/tutors");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Network error. Please try again later.");
      setLoading(false);

      // Cleanup
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tutorId");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your credentials to access your account.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
