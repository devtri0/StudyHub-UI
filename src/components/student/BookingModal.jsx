import React, { useState } from "react";
import { FiX, FiClock, FiCalendar, FiBook, FiMessageSquare, FiVideo } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";

const BookingModal = ({ tutor, onClose }) => {
  const [formData, setFormData] = useState({
    subject: tutor.subjects?.[0]?.name || "",
    date: new Date(),
    startTime: "",
    endTime: "",
    sessionType: "online",
    platform: "Zoom",
    link: "",
    instructions: "",
    location: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate random meeting links
  const generateMeetingLink = (platform) => {
    const randomId = Math.random().toString(36).substring(2, 10);
    switch (platform) {
      case "Zoom":
        return `https://zoom.us/j/${randomId}`;
      case "Google Meet":
        return `https://meet.google.com/${randomId.slice(0, 3)}-${randomId.slice(3, 6)}-${randomId.slice(6)}`;
      case "Microsoft Teams":
        return `https://teams.microsoft.com/l/meetup-join/19:${randomId}@thread.tacv2`;
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleSessionTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      sessionType: type,
      platform: type === "online" ? "Zoom" : "",
      link: type === "online" ? generateMeetingLink("Zoom") : ""
    }));
  };

  const handlePlatformChange = (platform) => {
    setFormData(prev => ({
      ...prev,
      platform,
      link: generateMeetingLink(platform)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate time selection
    if (!formData.startTime || !formData.endTime) {
      toast.error("Please select both start and end times");
      return;
    }
    
    if (formData.startTime >= formData.endTime) {
      toast.error("End time must be after start time");
      return;
    }

    if (formData.sessionType === "in-person" && !formData.location) {
      toast.error("Please provide a meeting location");
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        tutor: tutor._id,
        subject: formData.subject,
        date: formData.date.toISOString(),
        timeSlot: {
          start: formData.startTime,
          end: formData.endTime
        },
        sessionType: formData.sessionType,
        meetingDetails: formData.sessionType === "online" ? {
          platform: formData.platform,
          link: formData.link
        } : {
          location: formData.location
        },
        instructions: formData.instructions
      };

      const response = await axios.post(
        `https://studyhub-api-p0q4.onrender.com/book/${tutor._id}`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          },
        }
      );

      toast.success("Booking created successfully!");
      onClose(true);
    } catch (error) {
      console.error("Booking error:", error);
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         "Failed to create booking";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour < 20) {
        slots.push(`${hour.toString().padStart(2, "0")}:30`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX className="h-6 w-6" />
        </button>

        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
            {tutor.profilePicture ? (
              <img src={tutor.profilePicture} alt={tutor.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl text-gray-500">{tutor.firstName?.charAt(0)}{tutor.lastName?.charAt(0)}</span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Book Session with {tutor.firstName} {tutor.lastName}
            </h3>
            <p className="text-gray-600">{tutor.specialization}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiBook className="mr-2" />
              Subject
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {tutor.subjects?.map((subject, index) => (
                <option key={index} value={subject.name}>
                  {subject.name} ({subject.level})
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiCalendar className="mr-2" />
              Date
            </label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              minDate={new Date()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Time Slot */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiClock className="mr-2" />
                Start Time
              </label>
              <select
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select time</option>
                {timeSlots.map((time, index) => (
                  <option key={`start-${index}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiClock className="mr-2" />
                End Time
              </label>
              <select
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select time</option>
                {timeSlots
                  .filter(time => !formData.startTime || time > formData.startTime)
                  .map((time, index) => (
                    <option key={`end-${index}`} value={time}>
                      {time}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Session Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Type *
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleSessionTypeChange("online")}
                className={`px-4 py-2 rounded-lg border-2 ${formData.sessionType === "online" ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'}`}
              >
                Online
              </button>
              <button
                type="button"
                onClick={() => handleSessionTypeChange("in-person")}
                className={`px-4 py-2 rounded-lg border-2 ${formData.sessionType === "in-person" ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'}`}
              >
                In-Person
              </button>
            </div>
          </div>

          {/* Online Meeting Details */}
          {formData.sessionType === "online" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiVideo className="mr-2" />
                  Platform *
                </label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={(e) => handlePlatformChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="Zoom">Zoom</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiVideo className="mr-2" />
                  Meeting Link *
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Meeting link will be generated automatically"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">We've generated a {formData.platform} link for you</p>
              </div>
            </>
          )}

          {/* In-Person Location */}
          {formData.sessionType === "in-person" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiCalendar className="mr-2" />
                Meeting Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter meeting address"
                required
              />
            </div>
          )}

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiMessageSquare className="mr-2" />
              Additional Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any special requirements..."
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;