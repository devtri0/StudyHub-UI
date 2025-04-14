import React from "react";
import { Link } from "react-router"; // Fixed router import
import { LogIn, MenuIcon, Newspaper } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full shadow-sm bg-white px-4 md:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo Section */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center">
            <span className="text-white text-2xl font-bold font-serif">T</span>
          </div>
          <span className="text-xl font-bold text-blue-700 font-serif">
            TutorConnect
          </span>
        </div>

        {/* Mobile Menu Toggle */}
        <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
          <MenuIcon size={24} className="text-gray-700" />
        </label>
        <input type="checkbox" className="hidden" id="menu-toggle" />

        {/* Nav Links - Hidden on mobile, shown on tablet/desktop */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex space-x-6 text-gray-600 font-medium">
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
        </div>

        {/* Auth Buttons */}
        <div className="flex-shrink-0 hidden md:flex items-center space-x-3">
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
      </div>

      {/* Mobile Menu - Expanded when checkbox is checked */}
      <div className="md:hidden">
        <input type="checkbox" className="hidden peer" id="menu-toggle" />
        <div className="absolute left-0 right-0 bg-white mt-3 shadow-lg peer-checked:block hidden z-50 border-t border-gray-200">
          <ul className="py-2 px-4">
            <li className="mb-2">
              <Link to="/" className="text-blue-600 font-medium block py-2">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/tutors"
                className="text-gray-600 hover:text-blue-600 block py-2"
              >
                Tutors
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-blue-600 block py-2"
              >
                Dashboard
              </Link>
            </li>
            <li className="pt-2 border-t border-gray-200">
              <div className="flex flex-col space-y-2 my-2">
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Newspaper size={16} />
                  Sign Up
                </Link>
                <Link
                  to="/signin"
                  className="flex items-center justify-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  <LogIn size={16} />
                  Login In
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
