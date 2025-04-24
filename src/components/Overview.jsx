import React from "react";
import image1 from "../assets/images/overview.jpg";
import { Link } from "react-router";

const Overview = () => {
  return (
    <section className="w-full px-4 sm:px-6 py-12 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center px-4 md:px-8">
        {/* Text Content - Always appears first on mobile/tablet */}
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
              Find qualified tutors who match your needs.
            </li>
            <li>
              <span className="font-medium">Flexible Learning:</span> Learn
              online or in-person when it works for you.
            </li>
            <li>
              <span className="font-medium">Simple Booking System:</span> Book
              sessions and pay in one easy place.
            </li>
            <li>
              <span className="font-medium">Transparent Pricing:</span> Pay a
              simple flat rate with no hidden fees or surprises..
            </li>
          </ul>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition inline-block"
          >
            Register Now
          </Link>
        </div>

        {/* Image - Now properly positioned after text on mobile/tablet */}
        <div className="w-full flex justify-center">
          <div className="max-w-md lg:max-w-none w-full">
            <img
              src={image1}
              alt="Tutor and Student"
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
