import React, { useState } from "react";
import { Link } from "react-router"; // Fixed router import
import { LogIn, MenuIcon, Newspaper, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

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
        <div className="md:hidden ml-auto">
          <button onClick={toggleMobileMenu} className="cursor-pointer">
            <MenuIcon size={24} className="text-gray-700" />
          </button>
        </div>

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

            {/* Students Dropdown */}
            <li className="relative">
              <button
                className="flex items-center hover:text-blue-600"
                onClick={() => toggleDropdown("students")}
              >
                For Students
                <ChevronDown size={16} className="ml-1" />
              </button>
              {activeDropdown === "students" && (
                <div className="absolute mt-2 left-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                  <Link
                    to="/find-tutor"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Find Tutor
                  </Link>
                  <Link
                    to="/contact-us"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </li>

            {/* Subjects Dropdown */}
            <li className="relative">
              <button
                className="flex items-center hover:text-blue-600"
                onClick={() => toggleDropdown("subjects")}
              >
                Subjects
                <ChevronDown size={16} className="ml-1" />
              </button>
              {activeDropdown === "subjects" && (
                <div className="absolute mt-2 left-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                  <Link
                    to="/subjects/english"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    English
                  </Link>
                  <Link
                    to="/subjects/french"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    French
                  </Link>
                  <Link
                    to="/subjects/math"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Math
                  </Link>
                  <Link
                    to="/subjects/science"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Science
                  </Link>
                </div>
              )}
            </li>

            {/* Level of Study Dropdown */}
            <li className="relative">
              <button
                className="flex items-center hover:text-blue-600"
                onClick={() => toggleDropdown("levels")}
              >
                Levels Of Study
                <ChevronDown size={16} className="ml-1" />
              </button>
              {activeDropdown === "levels" && (
                <div className="absolute mt-2 left-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                  <Link
                    to="/levels/jhs"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    JHS
                  </Link>
                  <Link
                    to="/levels/shs"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    S.H.S
                  </Link>
                  <Link
                    to="/levels/tertiary"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Tertiary
                  </Link>
                </div>
              )}
            </li>

            <li>
              <Link to="/tutors" className="hover:text-blue-600">
                Tutors
              </Link>
            </li>
            <li>
              <Link to="/tutordash" className="hover:text-blue-600">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3 ml-auto">
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-white mt-3 shadow-lg z-50 border-t border-gray-200">
          <ul className="py-2 px-4">
            <li className="mb-2">
              <Link to="/" className="text-blue-600 font-medium block py-2">
                Home
              </Link>
            </li>

            {/* Mobile Students Dropdown */}
            <li className="mb-2">
              <button
                className="flex items-center justify-between w-full text-gray-600 py-2"
                onClick={() => toggleDropdown("mobile-students")}
              >
                For Students
                <ChevronDown size={16} />
              </button>
              {activeDropdown === "mobile-students" && (
                <div className="pl-4 mt-1">
                  <Link
                    to="/find-tutor"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                  >
                    Find Tutor
                  </Link>
                  <Link
                    to="/contact-us"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </li>

            {/* Mobile Subjects Dropdown */}
            <li className="mb-2">
              <button
                className="flex items-center justify-between w-full text-gray-600 py-2"
                onClick={() => toggleDropdown("mobile-subjects")}
              >
                Subjects
                <ChevronDown size={16} />
              </button>
              {activeDropdown === "mobile-subjects" && (
                <div className="pl-4 mt-1">
                  <Link
                    to="/subjects/english"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                  >
                    English
                  </Link>
                  <Link
                    to="/subjects/french"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                  >
                    French
                  </Link>
                  <Link
                    to="/subjects/math"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                  >
                    Math
                  </Link>
                  <Link
                    to="/subjects/science"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                  >
                    Science
                  </Link>
                </div>
              )}
            </li>

            {/* Mobile Level of Study Dropdown */}
            <li className="mb-2">
              <button
                className="flex items-center justify-between w-full text-gray-600 py-2"
                onClick={() => toggleDropdown("mobile-levels")}
              >
                Levels Of Study
                <ChevronDown size={16} />
              </button>
              {activeDropdown === "mobile-levels" && (
                <div className="pl-4 mt-1">
                  <Link
                    to="/levels/jhs"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                  >
                    JHS
                  </Link>
                  <Link
                    to="/levels/shs"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                  >
                    S.H.S
                  </Link>
                  <Link
                    to="/levels/tertiary"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                  >
                    Tertiary
                  </Link>
                </div>
              )}
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
                to="/tutordash"
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
      )}
    </nav>
  );
};

export default Navbar;
