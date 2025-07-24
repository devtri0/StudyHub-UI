import React from "react";
import image from "../assets/images/hero-2.jpg";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-800 font-sans py-8 md:py-12 mt-10 relative overflow-hidden">
      {/* Background decorative elements (Reduced size) */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-4 left-10 w-48 h-48 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      
      {/* Hero Section */}
      <main className="text-center px-4 max-w-7xl mx-auto relative z-10">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 font-sans tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent relative">
              TutorKonnet
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
            Connecting students and tutors for 
            <span className="text-blue-600 font-semibold"> personalized learning experiences</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Link to="/signup">
            <button className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-base shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 ease-out hover:from-blue-700 hover:to-blue-800">
              <span className="relative z-10">Join us now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>

        {/* Image Container */}
        <div className="flex justify-center pb-6 md:py-8">
          <div className="relative group">
            {/* Decorative border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            {/* Main image container */}
            <div className="relative bg-white p-1 rounded-2xl shadow-xl transition-all duration-500 ease-in-out transform group-hover:scale-105 group-hover:shadow-2xl">
              <img
                src={image}
                alt="Students Group"
                className="rounded-xl w-full max-w-3xl object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-1 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-2 -left-2 w-5 h-5 bg-blue-500 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute -top-1 -right-3 w-4 h-4 bg-purple-500 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute -bottom-3 -left-1 w-3 h-3 bg-pink-500 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </main>
      
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Hero;