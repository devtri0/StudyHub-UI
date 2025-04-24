import React from "react";

const BookingForm = () => {
  return (
    <form className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-blue-600">Book a Session</h2>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter subject"
          required
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Date
        </label>
        <input
          type="date"
          name="date"
          className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>

      {/* Time Slot */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            Start Time
          </label>
          <input
            type="time"
            name="start"
            className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            End Time
          </label>
          <input
            type="time"
            name="end"
            className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
      </div>

      {/* Meeting Platform */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Meeting Platform
        </label>
        <select
          name="platform"
          className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          defaultValue="Zoom"
        >
          <option value="Zoom">Zoom</option>
          <option value="Google Meet">Google Meet</option>
          <option value="Skype">Skype</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Meeting Link */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Meeting Link
        </label>
        <input
          type="url"
          name="link"
          className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="https://example.com/meeting"
        />
      </div>

      {/* Additional Instructions */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Additional Instructions
        </label>
        <textarea
          name="instructions"
          rows="4"
          className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Any details for the tutor..."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Booking
      </button>
    </form>
  );
};

export default BookingForm;
