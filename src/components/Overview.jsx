import React from "react";
import image1 from "../assets/images/About Us.jpg";

const Overview = () => {
  return (
    <section className="w-full px-4 sm:px-6 py-12 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 md:px-8">
        {/* Text Content */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
            Platform Overview
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Discover TutorConnect, where learning meets flexibility! Our
            platform simplifies the process of connecting dedicated tutors with
            eager students, creating a vibrant educational ecosystem that
            empowers both parties. With TutorConnect, students can effortlessly
            browse through a diverse pool of qualified tutors, each with their
            own unique teaching style and subject expertise. Get ready to take
            control of your learning experience!
          </p>

          <h3 className="text-lg font-semibold mb-2 font-serif">
            Key Features and Benefits
          </h3>
          <ul className="text-gray-700 list-disc list-inside space-y-2 mb-6">
            <li>
              <span className="font-medium">Effortless Tutor Discovery:</span>{" "}
              Access a wide range of qualified tutors for personalized learning.
            </li>
            <li>
              <span className="font-medium">Flexible Learning:</span> Choose
              between in-person and online sessions that fit your schedule.
            </li>
            <li>
              <span className="font-medium">Simple Booking System:</span> Easily
              schedule, manage, and handle payments for your lessons.
            </li>
            <li>
              <span className="font-medium">Transparent Pricing:</span> Pay a
              simple flat rate with no hidden fees or surprises..
            </li>
          </ul>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition">
            Explore Now
          </button>
        </div>

        {/* Image */}
        <div className="w-full">
          <img
            src={image1}
            alt="Tutor and Student"
            className="rounded-lg shadow-md w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Overview;
