import React from "react";
import image from "../assets/images/signup-bg.jpg";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      <div className="relative w-full h-64 md:h-80">
        <img
          src={image}
          alt="Signup Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center  bg-black/70">
          <div className="absolute top-4 left-6">
            <h1 className="text-2xl font-semibold text-blue-600 italic">
              TutorConnect
            </h1>
          </div>
          <h1 className="text-6xl font-bold text-white">
            Sign<span className="text-blue-600"> Up</span>
          </h1>
          <p className="text-white text-lg mt-2 text-center px-4">
            Thank you for expressing interest in our service. Kindly fill in the
            form below.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto bg-white p-10 mt-6 rounded-xl shadow-lg">
        <form className="space-y-6">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                User Name
              </label>
              <input
                name="userName"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* User Role */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Role</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="role"
            >
              <option value="user">Tutor</option>
              <option value="vendor">Student</option>
            </select>
          </div>

          {/* Submit Button */}
          <button className="bg-blue-600 text-white px-6 py-2 rounded w-[200px] mx-auto block">
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm mt-3">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
