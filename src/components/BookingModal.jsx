import React from "react";

const BookingModal = () => {
  return (
    <section className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 font-serif">
        Book a Tutor
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1" htmlFor="subject">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="e.g. Math, Science"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1" htmlFor="time">
            Time
          </label>
          <input
            type="time"
            id="time"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Book Now
        </button>
      </form>
    </section>
  );
};

export default BookingModal;
