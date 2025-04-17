import React from "react";
import { User, Calendar, Clock, LogOut, X } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:fixed top-0 left-0 h-screen bg-white shadow-md flex flex-col justify-between border-r border-gray-200 z-30 overflow-y-auto transition-all duration-300 ease-in-out
                   ${
                     isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
                   } md:translate-x-0 md:w-64`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-blue-600 font-serif">
              Tutor Panel
            </h1>
            {/* Close button - only on mobile */}
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-3">
            <a
              href="#profile"
              className="flex items-center py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md px-2 transition-colors duration-200 font-serif"
              onClick={() => toggleSidebar()}
            >
              <User className="w-5 h-5 mr-2" />
              Profile
            </a>
            <a
              href="#bookings"
              className="flex items-center py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md px-2 transition-colors duration-200 font-serif"
              onClick={() => toggleSidebar()}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Bookings
            </a>
            <a
              href="#availability"
              className="flex items-center py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md px-2 transition-colors duration-200 font-serif"
              onClick={() => toggleSidebar()}
            >
              <Clock className="w-5 h-5 mr-2" />
              Availability
            </a>
          </nav>
        </div>
        <div className="p-4 border-t">
          <button className="flex items-center text-blue-500 hover:text-blue-700 hover:underline font-serif transition-colors duration-200">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
