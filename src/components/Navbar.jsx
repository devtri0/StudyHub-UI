import React from "react";
import { Link } from "react-router"; // Fixed router import
import { LogIn, Newspaper } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full shadow-sm bg-white px-6 py-3 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        {/* <img src="/logo.png" alt="TutorConnect Logo" className="w-6 h-6" /> */}
        <span className="text-xl font-bold text-blue-700 font-serif">
          TutorConnect
        </span>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex space-x-6 text-gray-600 font-medium">
        <li>
          <Link
            to="/"
            className="text-blue-600 border-b-2 border-blue-600 pb-1"
          >
            Home
          </Link>
        </li>
        <li>
          <Link to="/tutors" className="hover:text-blue-600">
            Tutors
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
        </li>
      </ul>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-3">
        <Link
          to="/signup"
          className="flex items-center gap-1 border border-blue-600 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-50 transition"
        >
          <Newspaper size={16} />
          Sign Up
        </Link>
        <Link
          to="/signin"
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition"
        >
          <LogIn size={16} />
          Login In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
