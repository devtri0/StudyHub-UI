import React from "react";
import { Twitter, Linkedin, Youtube, Mail, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Footer = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Modified function to navigate to homepage
  const navigateToHome = () => {
    // You can still scroll to top before navigating if you want
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Navigate to the home page
    navigate("/");
  };

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="max-w-6xl w-full mx-auto px-4 md:px-8 flex flex-col">
        {/* Logo and Header */}
        <div className="flex flex-col items-center justify-center pt-8 pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-white text-2xl font-bold font-serif">
                T
              </span>
            </div>
            <h1 className="ml-2 text-2xl font-bold font-serif text-blue-700">
              TutorConnect
            </h1>
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full max-w-md text-center mb-6">
            <h2 className="text-base font-medium mb-3 font-serif">
              Subscribe to our newsletter
            </h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <button className="bg-blue-500 px-4 py-2 rounded hover:text-blue-600 text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-10">
          {/* Contact */}
          <div className="flex flex-col">
            <h3 className="font-medium text-base mb-3 font-serif">Contact</h3>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 mb-2 text-sm"
            >
              tutorconnect@gmail.com
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 mb-2 text-sm"
            >
              +233 55 950 4497
            </a>
          </div>

          {/* About */}
          <div className="flex flex-col">
            <h3 className="font-medium text-base mb-3 font-serif">About</h3>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 mb-2 text-sm"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 mb-2 text-sm"
            >
              Overview
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 mb-2 text-sm"
            >
              Locations
            </a>
          </div>

          {/* Students */}
          <div className="flex flex-col">
            <h3 className="font-medium text-base mb-3 font-serif">Students</h3>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 mb-2 text-sm"
            >
              Information for prospective Students
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 mb-2 text-sm"
            >
              Subjects
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 mb-2 text-sm"
            >
              Levels of Study
            </a>
          </div>

          {/* Tutors */}
          <div className="flex flex-col">
            <h3 className="font-medium text-base mb-3 font-serif">Tutors</h3>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 mb-2 text-sm"
            >
              Information for prospective Tutors
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 mb-2 text-sm"
            >
              Tutor Application Form
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 mb-2 text-sm"
            >
              Tutor Rates
            </a>
          </div>

          {/* Back to Top Button Column - Changed to navigate to home */}
          <div className="flex items-start justify-end">
            <button
              onClick={navigateToHome}
              className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors focus:outline-none"
              aria-label="Back to home"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-blue-500 mb-4 sm:mb-0">
            © 2025 TutorConnect
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex gap-4 text-blue-500 text-sm">
              <a href="#" className="hover:text-blue-600">
                Privacy
              </a>
              <a href="#" className="hover:text-blue-600">
                Terms
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <a href="#" className="hover:text-blue-600">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-blue-600">
                <Linkedin size={18} />
              </a>
              <a href="#" className="hover:text-blue-600">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
