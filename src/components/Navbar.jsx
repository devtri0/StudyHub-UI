import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, MenuIcon, Newspaper, ChevronDown, Loader2 } from "lucide-react";
import image from "../assets/images/Tutor-logo.png";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loadingLevel, setLoadingLevel] = useState(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLevelFilter = async (level) => {
    setLoadingLevel(level);
    try {
      const response = await axios.get(
        `https://studyhub-api-p0q4.onrender.com/tutors/search?level=${level}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch tutors");
      }

      if (response.data.tutors.length === 0) {
        toast.info(`No tutors found for ${level} level`);
        navigate("/tutors");
        return;
      }

      navigate("/tutors", {
        state: {
          tutors: response.data.tutors,
          filterLevel: level,
          count: response.data.count
        }
      });

    } catch (error) {
      console.error("Error filtering tutors:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to filter tutors");
    } finally {
      setLoadingLevel(null);
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full shadow-sm bg-white px-4 md:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo Section */}
        <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
          <img src={image} alt="logo" className="rounded-lg w-40 h-auto" />
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden ml-auto">
          <button 
            onClick={toggleMobileMenu} 
            className="cursor-pointer"
            aria-label="Toggle menu"
          >
            <MenuIcon size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Desktop Navigation */}
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
                Students
                <ChevronDown size={16} className="ml-1" />
              </button>
              {activeDropdown === "students" && (
                <div className="absolute mt-2 left-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Find Tutor
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </li>

            {/* Level of Study Dropdown */}
            <li className="relative">
              <button
                className="flex items-center hover:text-blue-600 min-w-[120px]"
                onClick={() => toggleDropdown("levels")}
                disabled={!!loadingLevel}
              >
                Levels Of Study
                <ChevronDown size={16} className="ml-1" />
                {loadingLevel && activeDropdown === "levels" && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
              </button>
              {activeDropdown === "levels" && !loadingLevel && (
                <div className="absolute mt-2 left-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                  <button
                    onClick={() => handleLevelFilter("JHS")}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center"
                  >
                    JHS
                    {loadingLevel === "JHS" && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    )}
                  </button>
                  <button
                    onClick={() => handleLevelFilter("SHS")}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center"
                  >
                    S.H.S
                    {loadingLevel === "SHS" && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    )}
                  </button>
                  <button
                    onClick={() => handleLevelFilter("Tertiary")}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center"
                  >
                    Tertiary
                    {loadingLevel === "Tertiary" && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    )}
                  </button>
                </div>
              )}
            </li>

            {/* Tutors Dropdown */}
            <li className="relative">
              <button
                className="flex items-center hover:text-blue-600"
                onClick={() => toggleDropdown("tutors")}
              >
                Tutors
                <ChevronDown size={16} className="ml-1" />
              </button>
              {activeDropdown === "tutors" && (
                <div className="absolute mt-2 left-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                  <Link
                    to="/tutors"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Tutor List
                  </Link>
                  <Link
                    to="/tutordash"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Dashboard
                  </Link>
                </div>
              )}
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
            to="/login"
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition"
          >
            <LogIn size={16} />
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-white mt-3 shadow-lg z-50 border-t border-gray-200">
          <ul className="py-2 px-4">
            <li className="mb-2">
              <Link 
                to="/" 
                className="text-blue-600 font-medium block py-2"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
            </li>

            {/* Mobile Students Dropdown */}
            <li className="mb-2">
              <button
                className="flex items-center justify-between w-full text-gray-600 py-2"
                onClick={() => toggleDropdown("mobile-students")}
              >
                Students
                <ChevronDown size={16} />
              </button>
              {activeDropdown === "mobile-students" && (
                <div className="pl-4 mt-1">
                  <Link
                    to="/signup"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                    onClick={toggleMobileMenu}
                  >
                    Find Tutor
                  </Link>
                  <Link
                    to="/contact"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                    onClick={toggleMobileMenu}
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </li>

            {/* Mobile Level of Study Dropdown */}
            <li className="mb-2">
              <button
                className="flex items-center justify-between w-full text-gray-600 py-2"
                onClick={() => toggleDropdown("mobile-levels")}
                disabled={!!loadingLevel}
              >
                Levels Of Study
                <ChevronDown size={16} />
                {loadingLevel && activeDropdown === "mobile-levels" && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
              </button>
              {activeDropdown === "mobile-levels" && !loadingLevel && (
                <div className="pl-4 mt-1">
                  <button
                    onClick={() => handleLevelFilter("JHS")}
                    className="w-full text-left block py-2 text-gray-600 hover:text-blue-600 flex items-center"
                  >
                    JHS
                    {loadingLevel === "JHS" && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    )}
                  </button>
                  <button
                    onClick={() => handleLevelFilter("SHS")}
                    className="w-full text-left block py-2 text-gray-600 hover:text-blue-600 flex items-center"
                  >
                    S.H.S
                    {loadingLevel === "SHS" && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    )}
                  </button>
                  <button
                    onClick={() => handleLevelFilter("Tertiary")}
                    className="w-full text-left block py-2 text-gray-600 hover:text-blue-600 flex items-center"
                  >
                    Tertiary
                    {loadingLevel === "Tertiary" && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    )}
                  </button>
                </div>
              )}
            </li>

            {/* Mobile Tutors Dropdown */}
            <li className="mb-2">
              <button
                className="flex items-center justify-between w-full text-gray-600 py-2"
                onClick={() => toggleDropdown("mobile-tutors")}
              >
                Tutors
                <ChevronDown size={16} />
              </button>
              {activeDropdown === "mobile-tutors" && (
                <div className="pl-4 mt-1">
                  <Link
                    to="/tutors"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                    onClick={toggleMobileMenu}
                  >
                    Tutor List
                  </Link>
                  <Link
                    to="/tutordash"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                    onClick={toggleMobileMenu}
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </li>

            {/* Mobile Auth Buttons */}
            <li className="pt-2 border-t border-gray-200">
              <div className="flex flex-col space-y-2 my-2">
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-full text-sm font-medium"
                  onClick={toggleMobileMenu}
                >
                  <Newspaper size={16} />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                  onClick={toggleMobileMenu}
                >
                  <LogIn size={16} />
                  Login
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