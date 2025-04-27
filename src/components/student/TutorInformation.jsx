import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiBook, 
  FiAlertCircle, FiCheckCircle, FiXCircle, FiLoader, 
  FiExternalLink, FiInfo, FiMapPin, FiAward, FiBriefcase 
} from "react-icons/fi";
import BookingModal from "./BookingModal";

const TutorInformation = ({ tutor: initialTutor }) => {
  const [tutor, setTutor] = useState(initialTutor || null);
  const [loading, setLoading] = useState(!initialTutor);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (err) {
        console.error('Failed to parse user data', err);
      }
    }

    if (!initialTutor && window.location.pathname.includes('/tutors/')) {
      const tutorId = window.location.pathname.split('/').pop();
      const fetchTutor = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const response = await axios.get(
            `https://studyhub-api-p0q4.onrender.com/tutors/${tutorId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          );
          
          console.log( response.data); // Debug log
          
          setTutor(response.data);
        } catch (err) {
          console.error("Fetch error:", err);
          setError(err.response?.data?.message || 
                 err.message || 
                 "Failed to load tutor information");
          toast.error("Failed to load tutor details");
        } finally {
          setLoading(false);
        }
      };

      fetchTutor();
    }
  }, [initialTutor]);

  const handleOpenBooking = () => {
    if (!currentUser) {
      toast.error("Please login to book a tutor");
      return;
    }
    setShowBookingModal(true);
  };

  const handleCloseBooking = (success) => {
    setShowBookingModal(false);
    if (success) {
      toast.success("Booking created successfully!");
    }
  };

  const filterTestData = (array) => {
    if (!array) return [];
    return array.filter(item => item && item !== "Master Adams" && item !== "");
  };

  const formatTimeSlot = (slot) => {
    if (!slot || (!slot.start && !slot.end)) return "Not specified";
    return `${slot.start || "N/A"} - ${slot.end || "N/A"}`;
  };

  const formatLocation = (loc) => {
    if (!loc) return "Location not specified";
    return `${loc.address || ''}${loc.address && loc.city ? ', ' : ''}${loc.city || ''}${(loc.address || loc.city) && loc.region ? ', ' : ''}${loc.region || ''}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Loading tutor information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">No tutor information available</p>
      </div>
    );
  }

  // Directly access all fields from the tutor object
  const {
    _id,
    firstName = "",
    lastName = "",
    email = "",
    phone = "",
    photo = "https://via.placeholder.com/200",
    isVerified = false,
    createdAt = "",
    // Flat structure fields
    specialization = [],
    languages = [],
    education = [],
    experience = [],
    location = {},
    bio = "Nobiography available",
    ratingsAverage = 0,
    ratingsQuantity = 0,
    generalAvailability = {
      weekdays: {},
      weekends: {},
      notes: ""
    },
    specificSlots = [],
    teachingStyle = "Not specified",
    subjects = []
  } = tutor;

  // Filter out test data
  const filteredSpecialization = filterTestData(specialization);
  const filteredLanguages = filterTestData(languages);
  const filteredEducation = filterTestData(education);
  const filteredExperience = filterTestData(experience);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 bg-white rounded-xl shadow-sm p-6">
        <div className="flex-shrink-0 flex justify-center">
          <div className="relative">
            <img
              src={photo}
              alt={`${firstName} ${lastName}`}
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200";
              }}
            />
            {isVerified && (
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {firstName} {lastName}
          </h1>
          <p className="text-blue-600 font-medium mb-3">
            {filteredSpecialization.join(", ") || "No specialization"}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <FiMail className="mr-2 text-blue-500" />
              <span>{email}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FiPhone className="mr-2 text-blue-500" />
              <span>{phone || "Not provided"}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FiMapPin className="mr-2 text-blue-500" />
              <span>{formatLocation(location)}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{bio}</p>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              ★ {ratingsAverage.toFixed(1)} ({ratingsQuantity} reviews)
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              <FiUser className="mr-1" />
              Member since {new Date(createdAt).toLocaleDateString()}
            </span>
            {filteredLanguages.map((lang, i) => (
              <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('availability')}
          className={`px-4 py-2 font-medium ${activeTab === 'availability' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Availability
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`px-4 py-2 font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Full Details
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subjects */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FiBook className="mr-2 text-blue-500" />
              Subjects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                    <p className="text-sm text-gray-600">{subject.level} level</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No subjects listed</p>
              )}
            </div>
          </div>

          {/* Teaching Style */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FiAward className="mr-2 text-blue-500" />
              Teaching Style
            </h2>
            <p className="text-gray-700">{teachingStyle}</p>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FiBriefcase className="mr-2 text-blue-500" />
              Experience
            </h2>
            <ul className="space-y-3">
              {filteredExperience.length > 0 ? (
                filteredExperience.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No experience information</li>
              )}
            </ul>
          </div>

          {/* Education */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FiAward className="mr-2 text-blue-500" />
              Education
            </h2>
            <ul className="space-y-3">
              {filteredEducation.length > 0 ? (
                filteredEducation.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No education information</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Availability Tab */}
      {activeTab === 'availability' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FiCalendar className="mr-2 text-blue-500" />
            Availability Schedule
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">General Availability</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Weekdays</h4>
                  <p className="text-gray-700">
                    {formatTimeSlot(generalAvailability.weekdays)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Weekends</h4>
                  <p className="text-gray-700">
                    {formatTimeSlot(generalAvailability.weekends)}
                  </p>
                </div>
                {generalAvailability.notes && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Notes</h4>
                    <p className="text-blue-700 italic">{generalAvailability.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Specific Availability</h3>
              {specificSlots.length > 0 ? (
                <div className="space-y-4">
                  {specificSlots.map((day, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-3">
                        {day.day} {day.date && `(${day.date})`}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {day.slots?.map((slot, slotIndex) => (
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
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500">No specific slots available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full Details Tab */}
      {activeTab === 'details' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Complete Profile Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
              <div className="space-y-3">
                <p><span className="font-medium">Full Name:</span> {firstName} {lastName}</p>
                <p><span className="font-medium">Email:</span> {email}</p>
                <p><span className="font-medium">Phone:</span> {phone || "Not provided"}</p>
                <p><span className="font-medium">Verified:</span> {isVerified ? 'Yes' : 'No'}</p>
                <p><span className="font-medium">Member Since:</span> {new Date(createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Location</h3>
              {location ? (
                <div className="space-y-3">
                  <p><span className="font-medium">Address:</span> {location.address || 'Not specified'}</p>
                  <p><span className="font-medium">City:</span> {location.city || 'Not specified'}</p>
                  <p><span className="font-medium">Region:</span> {location.region || 'Not specified'}</p>
                  {location.gpsAddress && (
                    <p><span className="font-medium">Coordinates:</span> {location.gpsAddress.join(', ')}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Location information not available</p>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile Details</h3>
              <div className="space-y-3">
                <p><span className="font-medium">Bio:</span> {bio}</p>
                <p><span className="font-medium">Rating:</span> {ratingsAverage.toFixed(1)} ({ratingsQuantity} reviews)</p>
                <p><span className="font-medium">Specialization:</span> {filteredSpecialization.join(', ') || 'None'}</p>
                <p><span className="font-medium">Languages:</span> {filteredLanguages.join(', ') || 'None'}</p>
              </div>
            </div>

            {/* Education & Experience */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Education & Experience</h3>
              <div className="space-y-3">
                <p><span className="font-medium">Education:</span></p>
                <ul className="list-disc pl-5">
                  {filteredEducation.length > 0 ? (
                    filteredEducation.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))
                  ) : (
                    <li className="text-gray-500">No education information</li>
                  )}
                </ul>
                <p><span className="font-medium">Experience:</span></p>
                <ul className="list-disc pl-5">
                  {filteredExperience.length > 0 ? (
                    filteredExperience.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))
                  ) : (
                    <li className="text-gray-500">No experience information</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleOpenBooking}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition"
        >
          Book Session
        </button>
      </div>

      {/* Booking Modal */}
      {showBookingModal && tutor && currentUser && (
        <BookingModal 
          tutor={tutor} 
          onClose={handleCloseBooking} 
          currentUser={currentUser} 
        />
      )}
    </div>
  );
};

export default TutorInformation;