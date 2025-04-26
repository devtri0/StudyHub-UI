import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BookingForm = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    date: "",
    startTime: "",
    endTime: "",
    platform: "Zoom",
    link: "",
    instructions: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Check authentication and get current user on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Please login to book a session");
        }

        const response = await axios.get("https://studyhub-api-p0q4.onrender.com/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCurrentUser(response.data.data);
      } catch (error) {
        toast.error("You need to login first");
        navigate("/login");
      } finally {
        setLoadingUser(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token || !currentUser) {
        throw new Error("Authentication required");
      }

      const bookingData = {
        student: currentUser._id,
        tutor: tutorId,
        subject: formData.subject,
        date: formData.date,
        timeSlot: {
          start: formData.startTime,
          end: formData.endTime
        },
        meetingDetails: {
          platform: formData.platform,
          link: formData.link,
          instructions: formData.instructions
        }
      };

      const response = await axios.post(
        `https://studyhub-api-p0q4.onrender.com/book/${tutorId}`,
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(response.data.message || "Booking created successfully!");
      
      // Reset form after successful submission
      setFormData({
        subject: "",
        date: "",
        startTime: "",
        endTime: "",
        platform: "Zoom",
        link: "",
        instructions: ""
      });

      // Optionally redirect to bookings page
      navigate("/my-bookings");

    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md text-center">
        <p>Please login to book a session</p>
        <button 
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-blue-600">Book a Session</h2>

      {/* Student Info (readonly) */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="font-medium">Booking as:</p>
        <p>{currentUser.firstName} {currentUser.lastName}</p>
        <p className="text-sm text-gray-600">{currentUser.email}</p>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Subject *
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Mathematics, Physics, etc."
          required
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Date *
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* Time Slot */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            Start Time *
          </label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            End Time *
          </label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
      </div>

      {/* Meeting Platform */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Meeting Platform *
        </label>
        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
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
          value={formData.link}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="https://zoom.us/j/123456789"
          pattern="https?://.+"
        />
      </div>

      {/* Additional Instructions */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Additional Instructions
        </label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Any specific topics or materials you'd like to cover..."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex justify-center items-center ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          'Confirm Booking'
        )}
      </button>
    </form>
  );
};

export default BookingForm;