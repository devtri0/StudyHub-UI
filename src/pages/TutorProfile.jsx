import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router";

const TutorProfile = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://studyhub-api-p0q4.onrender.com/tutors/${id}`
        );
        setTutor(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch tutor data");
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading tutor profile: {error}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">Tutor not found</p>
      </div>
    );
  }

  const formatTimeSlot = (slot) => {
    return `${slot.start} - ${slot.end}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-sm">
        <div className="flex-shrink-0 flex justify-center">
          <div className="relative">
            <img
              src={tutor.photo || "https://via.placeholder.com/200"}
              alt={`${tutor.firstName} ${tutor.lastName}`}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-xl"
            />
            <div className="absolute -bottom-3 -right-3 bg-white px-3 py-1 rounded-full shadow-md flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="font-medium text-gray-800">
                {tutor.profile?.ratingsAverage?.toFixed(1) || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {tutor.firstName} {tutor.lastName}
          </h1>
          <p className="text-lg text-blue-600 font-semibold mb-4">
            {tutor.profile?.specialization?.join(", ") ||
              "No specialization listed"}
          </p>

          <p className="text-gray-600 max-w-2xl mb-6">
            {tutor.profile?.bio || "No biography available"}
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              {tutor.profile?.ratingsQuantity || 0} reviews
            </span>
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              {tutor.profile?.experience?.[0] || "Experienced tutor"}
            </span>
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              {tutor.phone || "Contact not available"}
            </span>
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              {tutor.profile?.location?.city || "Location not specified"}
            </span>
          </div>
        </div>
      </div>

      {/* Teaching Style & Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Teaching Style & Education */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
              1
            </span>
            Teaching Approach & Education
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Teaching Style
            </h3>
            <p className="text-gray-600 bg-blue-50 px-4 py-3 rounded-lg">
              {tutor.style?.teachingStyle || "Not specified"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Education
            </h3>
            <ul className="space-y-3">
              {tutor.profile?.education?.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">{item}</span>
                </li>
              )) || (
                <li className="text-gray-500">
                  No education information provided
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Subjects & Languages */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3">
              2
            </span>
            Expertise & Languages
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Subjects
            </h3>
            <div className="flex flex-wrap gap-3">
              {tutor.style?.subjects?.map((subject, index) => (
                <div
                  key={index}
                  className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200"
                >
                  <p className="font-medium text-gray-800">{subject.name}</p>
                  <p className="text-xs text-gray-500">{subject.level} level</p>
                </div>
              )) || <p className="text-gray-500">No subjects listed</p>}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              {tutor.profile?.languages?.map((language, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200"
                >
                  {language}
                </span>
              )) || <p className="text-gray-500">No languages listed</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Availability & Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Availability */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
              3
            </span>
            Availability
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              General Availability
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800 mb-1">
                Weekdays:{" "}
                {tutor.availability?.generalAvailability?.weekdays?.start} -{" "}
                {tutor.availability?.generalAvailability?.weekdays?.end}
              </p>
              <p className="font-medium text-gray-800">
                Weekends:{" "}
                {tutor.availability?.generalAvailability?.weekends?.start} -{" "}
                {tutor.availability?.generalAvailability?.weekends?.end}
              </p>
              {tutor.availability?.generalAvailability?.notes && (
                <p className="text-sm text-gray-600 mt-2 italic">
                  {tutor.availability.generalAvailability.notes}
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Available Slots
            </h3>
            {tutor.availability?.specificSlots?.length > 0 ? (
              <div className="space-y-4">
                {tutor.availability.specificSlots.map((day, index) => (
                  <div
                    key={index}
                    className="border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <h4 className="font-medium text-gray-800 mb-2">
                      {day.day} {day.date && `(${day.date})`}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {day.slots.map((slot, slotIndex) => (
                        <div
                          key={slotIndex}
                          className="bg-blue-50 text-blue-700 px-3 py-2 rounded text-sm"
                        >
                          {formatTimeSlot(slot)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specific slots available</p>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3">
              4
            </span>
            Professional Experience
          </h2>

          <ul className="space-y-4">
            {tutor.profile?.experience?.map((exp, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <span className="ml-3 text-gray-700">{exp}</span>
              </li>
            )) || (
              <li className="text-gray-500">
                No experience information provided
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Booking CTA */}
      <div className="text-center">
        <Link
          to="/login"
          className="relative inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group overflow-hidden"
        >
          <span className="relative z-10">Book Your Session Now</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Link>
      </div>
    </div>
  );
};

export default TutorProfile;
