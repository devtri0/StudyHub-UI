import React from "react";
import { Twitter, Linkedin, Youtube, Mail, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Tutor-logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate("/");
  };

  return (
    <div className="bg-white border-t border-gray-100">
      <div className="max-w-6xl w-full mx-auto px-4 md:px-8">
        {/* Logo and Newsletter Section */}
        <div className="flex flex-col items-center py-12">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src={logo} 
              alt="TutorKonnet" 
              className="h-16 w-auto hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full max-w-md text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Subscribe to our newsletter
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 py-12 border-t border-gray-100">
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:tutorkonnet@gmail.com"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                tutorkonnet@gmail.com
              </a>
              <a
                href="tel:+233559504497"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                +233 55 950 4497
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Home
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Overview
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Locations
              </a>
            </div>
          </div>

          {/* Students */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Students</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm leading-relaxed"
              >
                Information for prospective Students
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Subjects
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Levels of Study
              </a>
            </div>
          </div>

          {/* Tutors */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Tutors</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm leading-relaxed"
              >
                Information for prospective Tutors
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Tutor Application Form
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Tutor Rates
              </a>
            </div>
          </div>

          {/* Back to Top Button */}
          <div className="flex justify-center md:justify-end">
            <button
              onClick={navigateToHome}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              aria-label="Back to home"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-8 border-t border-gray-100">
          <div className="text-sm text-gray-600 mb-4 sm:mb-0">
            © 2025 TutorKonnet. All rights reserved.
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              <a 
                href="#" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="YouTube"
              >
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