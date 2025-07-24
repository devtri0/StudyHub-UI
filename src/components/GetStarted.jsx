import React from "react";
import image2 from "../assets/images/join-us.jpg";
import { ArrowRight } from "lucide-react"; // Import a modern icon for the button

const GetStarted = () => {
  return (
    <div className="max-w-5xl mx-4 sm:mx-auto my-16 overflow-hidden rounded-2xl shadow-xl bg-white transform transition-transform duration-300 hover:scale-[1.005] hover:shadow-2xl">
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Blue Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 md:p-10 md:w-1/2 flex flex-col justify-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight tracking-tight">
            Ready to <span className="text-blue-200">Start Your</span> Learning Journey?
          </h2>

          <p className="mb-8 text-lg md:text-xl text-blue-100 leading-relaxed">
            Find the perfect tutor for your needs or create your student dashboard to unlock a world of personalized learning opportunities.
          </p>

          <div>
            <button className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl text-base">
              Join for free
              <ArrowRight className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 relative">
          <img
            src={image2}
            alt="Students collaborating in classroom"
            className="w-full h-full object-cover rounded-tr-2xl rounded-br-2xl md:rounded-bl-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;