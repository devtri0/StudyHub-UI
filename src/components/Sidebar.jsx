import React, { useState } from "react";
import {
  User,
  Calendar,
  Clock,
  LogOut,
  X,
  Menu,
  Home,
  Book,
} from "lucide-react";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeOnSelect = (section) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-blue-600 text-white p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg flex flex-col z-30 transition-all duration-300 ease-in-out
                  ${
                    isOpen
                      ? "w-64 translate-x-0"
                      : "w-16 -translate-x-full md:translate-x-0"
                  } md:w-64`}
      >
        {/* Close Button - Mobile Only */}
        <button
          className="md:hidden absolute top-4 right-4 text-white hover:text-gray-200"
          onClick={toggleSidebar}
        >
          <X size={20} />
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center p-4 md:p-6 mb-6">
          <div className="relative">
            <img
              src="/api/placeholder/80/80"
              alt="Profile"
              className="w-10 h-10 md:w-20 md:h-20 rounded-full object-cover border-2 border-white"
            />
          </div>
          <h2 className="text-lg font-semibold mt-2 hidden md:block">
            User Name
          </h2>
          <p className="text-xs text-blue-100 hidden md:block">
            user@example.com
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-2">
          <button
            onClick={() => closeOnSelect("dashboard")}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all
                      ${
                        activeSection === "dashboard"
                          ? "bg-blue-700"
                          : "hover:bg-blue-700"
                      }`}
          >
            <Home className="text-lg" />
            <span className="ml-3 hidden md:inline">Dashboard</span>
          </button>

          <button
            onClick={() => closeOnSelect("profile")}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all
                      ${
                        activeSection === "profile"
                          ? "bg-blue-700"
                          : "hover:bg-blue-700"
                      }`}
          >
            <User className="text-lg" />
            <span className="ml-3 hidden md:inline">Profile</span>
          </button>

          <button
            onClick={() => closeOnSelect("availability")}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all
                      ${
                        activeSection === "availability"
                          ? "bg-blue-700"
                          : "hover:bg-blue-700"
                      }`}
          >
            <Calendar className="text-lg" />
            <span className="ml-3 hidden md:inline">Availability</span>
          </button>

          <button
            onClick={() => closeOnSelect("teachingStyle")}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all
                      ${
                        activeSection === "teachingStyle"
                          ? "bg-blue-700"
                          : "hover:bg-blue-700"
                      }`}
          >
            <Book className="text-lg" />
            <span className="ml-3 hidden md:inline">Teaching Style</span>
          </button>
        </nav>

        {/* Logout Button */}
        <button className="w-full flex items-center px-3 py-3 md:mt-6 bg-red-500 hover:bg-red-600 transition-all">
          <LogOut className="text-lg" />
          <span className="ml-3 hidden md:inline">Logout</span>
        </button>
      </aside>

      {/* Content Spacer - For Fixed Sidebar */}
      <div className="md:pl-64"></div>
    </>
  );
};

export default Sidebar;
