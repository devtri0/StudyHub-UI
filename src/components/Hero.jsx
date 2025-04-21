import React from "react";
import image from "../assets/images/Hero.jpg";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="bg-white text-gray-800 font-sans py-8 md:py-16 mt-15">
      {/* Hero Section */}
      <main className="text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
          Welcome to <br /> TutorConnect
        </h1>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Connecting students and tutors for personalized learning experiences
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Link to="/signup">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Join us now
            </button>
          </Link>
          <Link to="/tutors">
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50">
              Book a Tutor
            </button>
          </Link>
        </div>

        <div className="flex justify-center pb-4 md:py-10">
          <div className="relative transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-105 hover:shadow-xl active:shadow-xl">
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
