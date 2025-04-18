import React from "react";
import { Twitter, Linkedin, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-6xl w-full mx-auto px-4 md:px-8 flex flex-col mt-17">
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
          <div className="w-full max-w-md text-center mb-6 mt-10">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-5 mt-9">
          {/* Product Column */}
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

          {/* Resources Column */}
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

          {/* Company Column */}
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

          {/* Plans & Pricing Column */}
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
        </div>
      </div>

      {/* Footer - with no excessive space above it */}
      <div className="mt-auto w-full border-t border-gray-200 bg-gray-50 py-4">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="relative"></div>
            <div className="ml-4 text-sm text-blue-500">
              © 2025 TutorConnect
            </div>
          </div>

          <div className="flex items-center">
            <a href="#" className="text-sm text-blue-500 mr-4">
              Privacy
            </a>
            <a href="#" className="text-sm text-blue-500 mr-4">
              Terms
            </a>

            <div className="flex space-x-3 ml-2">
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600">
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
