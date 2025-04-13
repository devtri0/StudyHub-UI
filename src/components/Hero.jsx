import React from "react";
import image from "../assets/images/Hero.jpg";

const Hero = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <main className="text-center mt-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
          Welcome to <br /> TutorConnect
        </h1>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Connecting students and tutors for personalized learning experiences
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Join us now
          </button>
          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50">
            Book a Tutor
          </button>
        </div>

        {/* Image with Play Button */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={image}
              alt="Students Group"
              className="rounded-lg shadow-md w-full max-w-3xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
