import React, { useState } from "react";

import { Menu } from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import Booking from "../components/Booking";
import Calendar from "../components/Calendar";
import Sidebar from "../components/Sidebar";

const TutorDash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 w-full md:ml-64 mt-16 md:mt-0">
        {" "}
        {/* This margin matches the sidebar width on desktop */}
        <div className="p-4 md:p-6 space-y-6">
          <ProfileForm />
          <Booking />
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default TutorDash;
