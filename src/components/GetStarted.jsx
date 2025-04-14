import React from "react";
import image2 from "../assets/images/Get started.jpg";

const GetStarted = () => {
  return (
    <div className="max-w-5xl mx-4 sm:mx-auto my-8 overflow-hidden rounded-lg shadow-md bg-white mb-10 ">
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Blue Section */}
        <div className="bg-blue-500 text-white p-8 md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 font-serif">
            Get Started Today!
          </h2>

          <p className="mb-8 text-white">
            Find the perfect tutor for your needs or create your student
            dashboard to start your learning journey now.
          </p>

          <div>
            <button className="bg-white text-blue-500 font-medium py-2 px-6 rounded-md hover:bg-blue-50 transition duration-300">
              Join for free
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2">
          <img
            src={image2}
            alt="Students collaborating in classroom"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
