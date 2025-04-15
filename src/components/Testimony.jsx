import React from "react";
import image from "../assets/images/T2.jpg";

const Testimony = () => {
  const testimonial = {
    name: "Sima Dawson",
    tutorName: "Mrs. Johnson",
    text: "The sessions with Mr. Johnson were incredibly insightful. He made complex topics easy to understand!",
    image: image,
  };

  return (
    <div className="max-w-4xl mx-auto p-4 border-t border-b border-gray-200 py-8 mt-15">
      <h1 className="font-serif text-2xl text-center mb-7 font-bold">
        Testimony
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Testimonial Image */}
        <div className="w-full md:w-1/3">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="w-full md:w-2/3">
          {/* Testimonial Text */}
          <p className="text-gray-700 mb-6">{testimonial.text}</p>

          {/* Student Name and Tutor */}
          <h3 className="font-medium text-lg">{testimonial.name}</h3>
          <p className="text-gray-500 text-sm">
            Tutored by {testimonial.tutorName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimony;
