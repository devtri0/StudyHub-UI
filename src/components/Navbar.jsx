import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { LogIn, MenuIcon, Newspaper, ChevronDown } from "lucide-react";
import image from "../assets/images/Tutor-logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-out
      ${scrolled 
        ? "bg-white/90 backdrop-blur-lg shadow-2xl py-1" 
        : "bg-white/95 backdrop-blur-sm shadow-lg py-2"}`}>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-white/90 to-purple-50/20 -z-10"></div>
      
      <div className="max-w-7xl mx-auto flex items-center px-4 md:px-6">
        {/* Logo Section */}
        <Link to="/" className="flex-shrink-0 flex items-center space-x-1 group">
          <div className="relative overflow-hidden rounded-xl transform transition-all duration-300 group-hover:scale-105">
            <img 
              src={image} 
              alt="logo" 
              className="w-32 h-auto shadow-md group-hover:shadow-lg transition-shadow duration-300" 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden ml-auto">
          <button 
            onClick={toggleMobileMenu} 
            className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all duration-300 hover:shadow-md"
          >
            <MenuIcon size={20} className="text-blue-600" />
          </button>
        </div>

        {/* Nav Links - Hidden on mobile, shown on tablet/desktop */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex space-x-6 text-gray-700 font-bold text-base">
            <li>
              <Link
                to="/"
                className="relative group text-blue-600 px-2 py-1 inline-block"
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"></span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </li>

            {/* Students Dropdown */}
            <li className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-blue-600 transition-all duration-300 px-2 py-1 rounded-xl hover:bg-blue-50/50"
                onClick={() => toggleDropdown("students")}
              >
                Students
                <ChevronDown size={14} className={`ml-1 transition-transform duration-300 ${activeDropdown === "students" ? "rotate-180 text-blue-600" : "group-hover:text-blue-600"}`} />
              </button>
              {activeDropdown === "students" && (
                <div className="absolute mt-2 left-0 bg-white/95 backdrop-blur-lg shadow-xl rounded-xl py-2 w-40 z-50 border border-gray-100/50 animate-slideDown">
                  <div className="px-1">
                    <Link
                      to="/tutors"
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-300 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      Find Tutor
                    </Link>
                    <Link
                      to="/footer"
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-300 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                      Contact Us
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* Level of Study Dropdown */}
            <li className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-blue-600 transition-all duration-300 px-2 py-1 rounded-xl hover:bg-blue-50/50"
                onClick={() => toggleDropdown("levels")}
              >
                Levels Of Study
                <ChevronDown size={14} className={`ml-1 transition-transform duration-300 ${activeDropdown === "levels" ? "rotate-180 text-blue-600" : "group-hover:text-blue-600"}`} />
              </button>
              {activeDropdown === "levels" && (
                <div className="absolute mt-2 left-0 bg-white/95 backdrop-blur-lg shadow-xl rounded-xl py-2 w-40 z-50 border border-gray-100/50 animate-slideDown">
                  <div className="px-1">
                    <Link
                      to="/tutors"
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-300 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      JHS
                    </Link>
                    <Link
                      to="/tutors"
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-300 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                      S.H.S
                    </Link>
                    <Link
                      to="/tutors"
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-300 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                      Tertiary
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* Tutors Dropdown */}
            <li className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-blue-600 transition-all duration-300 px-2 py-1 rounded-xl hover:bg-blue-50/50"
                onClick={() => toggleDropdown("tutors")}
              >
                Tutors
                <ChevronDown size={14} className={`ml-1 transition-transform duration-300 ${activeDropdown === "tutors" ? "rotate-180 text-blue-600" : "group-hover:text-blue-600"}`} />
              </button>
              {activeDropdown === "tutors" && (
                <div className="absolute mt-2 left-0 bg-white/95 backdrop-blur-lg shadow-xl rounded-xl py-2 w-40 z-50 border border-gray-100/50 animate-slideDown">
                  <div className="px-1">
                    <Link
                      to="/tutors"
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-300 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                      Tutor List
                    </Link>
                    <Link
                      to="/tutordash"
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-300 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></div>
                      Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3 ml-auto">
          <Link
            to="/signup"
            className="group relative flex items-center gap-1 border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:border-blue-700 hover:text-blue-700 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <Newspaper size={14} className="transition-transform duration-300 group-hover:rotate-6" />
              <span className="ml-1">Sign Up</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
          </Link>
          
          <Link
            to="/login"
            className="group relative flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <LogIn size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              <span className="ml-1">Login In</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-white/95 backdrop-blur-lg mt-2 shadow-2xl z-50 border-t border-gray-100 animate-slideDown rounded-b-2xl mx-2 overflow-hidden">
          <ul className="py-2 px-3 space-y-0.5">
            <li>
              <Link to="/" className="block py-2 text-blue-600 font-bold text-base hover:bg-blue-50/80 rounded-xl px-3 transition-all duration-300">
                Home
              </Link>
            </li>

            {/* Mobile Students Dropdown */}
            <li>
              <button
                className="flex items-center justify-between w-full py-2 text-gray-700 font-bold text-base hover:bg-blue-50/80 rounded-xl px-3 transition-all duration-300"
                onClick={() => toggleDropdown("mobile-students")}
              >
                Students
                <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === "mobile-students" ? "rotate-180 text-blue-600" : ""}`} />
              </button>
              {activeDropdown === "mobile-students" && (
                <div className="pl-3 mt-0.5 space-y-0.5 animate-slideRight">
                  <Link
                    to="/tutors"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl px-3 transition-all duration-300 text-sm"
                  >
                    <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                    Find Tutor
                  </Link>
                  <Link
                    to="/footer"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl px-3 transition-all duration-300 text-sm"
                  >
                    <div className="w-1 h-1 bg-purple-500 rounded-full mr-2"></div>
                    Contact Us
                  </Link>
                </div>
              )}
            </li>

            {/* Mobile Level of Study Dropdown */}
            <li>
              <button
                className="flex items-center justify-between w-full py-2 text-gray-700 font-bold text-base hover:bg-blue-50/80 rounded-xl px-3 transition-all duration-300"
                onClick={() => toggleDropdown("mobile-levels")}
              >
                Levels Of Study
                <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === "mobile-levels" ? "rotate-180 text-blue-600" : ""}`} />
              </button>
              {activeDropdown === "mobile-levels" && (
                <div className="pl-3 mt-0.5 space-y-0.5 animate-slideRight">
                  <Link
                    to="/levels/jhs"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl px-3 transition-all duration-300 text-sm"
                  >
                    <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                    JHS
                  </Link>
                  <Link
                    to="/levels/shs"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl px-3 transition-all duration-300 text-sm"
                  >
                    <div className="w-1 h-1 bg-yellow-500 rounded-full mr-2"></div>
                    S.H.S
                  </Link>
                  <Link
                    to="/levels/tertiary"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl px-3 transition-all duration-300 text-sm"
                  >
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                    Tertiary
                  </Link>
                </div>
              )}
            </li>

            <li>
              <button
                className="flex items-center justify-between w-full py-2 text-gray-700 font-bold text-base hover:bg-blue-50/80 rounded-xl px-3 transition-all duration-300"
                onClick={() => toggleDropdown("mobile-tutors")}
              >
                Tutors
                <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === "mobile-tutors" ? "rotate-180 text-blue-600" : ""}`} />
              </button>
              {activeDropdown === "mobile-tutors" && (
                <div className="pl-3 mt-0.5 space-y-0.5 animate-slideRight">
                  <Link
                    to="/tutors"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl px-3 transition-all duration-300 text-sm"
                  >
                    <div className="w-1 h-1 bg-indigo-500 rounded-full mr-2"></div>
                    Tutor List
                  </Link>
                  <Link
                    to="/tutordash"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl px-3 transition-all duration-300 text-sm"
                  >
                    <div className="w-1 h-1 bg-pink-500 rounded-full mr-2"></div>
                    Dashboard
                  </Link>
                </div>
              )}
            </li>
            
            <li className="pt-2 border-t border-gray-200/70">
              <div className="grid grid-cols-1 gap-2 py-2"> 
                <Link
                  to="/signup"
                  className="group flex items-center justify-center gap-1 border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all duration-300"
                >
                  <Newspaper size={14} className="transition-transform duration-300 group-hover:rotate-6" />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="group flex items-center justify-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300"
                >
                  <LogIn size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  Login In
                </Link>
              </div>
            </li>
          </ul>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideRight {
          from {
            transform: translateX(-10px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-slideRight {
          animation: slideRight 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;