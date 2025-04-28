import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AvailabilitySettings from "../components/AvailabilitySettings";
import TeachingStyleForm from "../components/TeachingStyleForm";
import {
  FiHome,
  FiUser,
  FiCalendar,
  FiBook,
  FiLogOut,
  FiClock,
  FiAward,
  FiBookmark,
} from "react-icons/fi";
import ProfileManage from "../components/ProfileManage";

const TutorDash = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const navigate = useNavigate();

  // Get authentication data
  const user = JSON.parse(localStorage.getItem("user"));
  const tutorId = user?.id;
  const token = localStorage.getItem("token");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);
    setIsUploadingImage(true);

    try {
      const response = await axios.patch(
        "https://studyhub-api-p0q4.onrender.com/update/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local storage with new user data
      const updatedUser = {
        ...user,
        photo: response.data.url || URL.createObjectURL(file),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update the tutor data with the new image
      setTutorData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          image: response.data.url || URL.createObjectURL(file),
        },
      }));

      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const fetchWithAuth = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      navigate("/login");
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    return response.json();
  };

  const fetchTutorData = async () => {
    try {
      const [userData, profileData, availabilityData, styleData, bookingsData] =
        await Promise.all([
          fetchWithAuth(`https://studyhub-api-p0q4.onrender.com/users/me`),
          fetchWithAuth(
            `https://studyhub-api-p0q4.onrender.com/tutor/profile/${tutorId}`
          ),
          fetchWithAuth(
            `https://studyhub-api-p0q4.onrender.com/tutor/ava/${tutorId}`
          ),
          fetchWithAuth(
            `https://studyhub-api-p0q4.onrender.com/tutor/style/${tutorId}`
          ),
          fetchWithAuth(`https://studyhub-api-p0q4.onrender.com/bookings`),
        ]);

      // Transform data into consistent format
      const transformedData = {
        profile: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          bio: profileData.data.bio || "No bio provided",
          education: profileData.data.education || ["No education provided"],
          specialization: profileData.data.specialization || [],
          experience: profileData.data.experience || [],
          languages: profileData.data.languages || [],
          location: profileData.data.location || {
            address: "",
            city: "",
            region: "",
            gpsAddress: ["", ""],
          },
          image: userData.photo || user?.photo || "/profile.jpg",
          ratingsAverage: profileData.data?.ratingsAverage || 0,
          ratingsQuantity: profileData.data?.ratingsQuantity || 0,
        },
        availability: {
          generalAvailability: availabilityData.data?.generalAvailability || {
            weekdays: { start: "09:00", end: "17:00" },
            weekends: { start: "10:00", end: "15:00" },
          },
          specificSlots: availabilityData.data?.specificSlots || [],
        },
        teachingStyle: {
          approach:
            styleData.data?.teachingStyle || "No teaching style provided",
          methods: styleData.data?.methods || ["No methods specified"],
          experience: profileData.data?.experience || "No experience provided",
          specialties:
            styleData.data?.subjects
              ?.map((s) => `${s.name} (${s.level})`)
              .join(", ") || "No specialties provided",
        },
        bookings: (bookingsData.data || [])
          .filter((b) => b.tutor === tutorId || b.tutor?.id === tutorId)
          .map((booking) => ({
            id: booking.id,
            student: booking.student?.name || "Anonymous Student",
            date: new Date(booking.date).toLocaleDateString(),
            time: `${booking.time}`,
            subject: booking.subject || "No subject specified",
            status: booking.status || "pending",
          })),
      };

      setTutorData(transformedData);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);

      if (err.message.includes("401")) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!token || !tutorId) {
      navigate("/login");
      return;
    }
    fetchTutorData();
  }, [tutorId, token, navigate]);

  const handleBookingAction = async (bookingId, action) => {
    try {
      // 1. Authentication check
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required. Please login.");

      // 2. Validate action type
      const validActions = ["confirmed", "rejected", "cancelled", "completed"];
      if (!validActions.includes(action)) {
        throw new Error(`Invalid action. Allowed: ${validActions.join(", ")}`);
      }

      // 3. Prepare request body according to schema
      const requestBody = { status: action };

      // 4. Handle meeting link for confirmed status
      if (action === "confirmed") {
        let meetingLink;
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
          meetingLink = window.prompt(
            attempts === 0
              ? "Please enter the meeting link (must be a valid URL starting with http/https):"
              : "Invalid URL. Please enter a valid meeting link starting with http/https:"
          );

          if (meetingLink === null) {
            throw new Error("Meeting link entry cancelled");
          }

          if (
            meetingLink &&
            (meetingLink.startsWith("http://") ||
              meetingLink.startsWith("https://"))
          ) {
            requestBody.meetingLink = meetingLink;
            break;
          }

          attempts++;
          if (attempts === maxAttempts) {
            throw new Error(
              "Maximum attempts reached. Please try again later."
            );
          }
        }
      }

      // 5. Make API request
      const response = await fetch(
        `https://studyhub-api-p0q4.onrender.com/manage/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      // 6. Handle response
      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage =
          responseData.message ||
          responseData.error?.details?.[0]?.message ||
          `Failed to ${action} booking`;
        throw new Error(errorMessage);
      }

      // 7. Return success response
      return {
        success: true,
        message: responseData.message || `Booking ${action} successfully`,
        booking: responseData.data,
      };
    } catch (error) {
      console.error(`Booking ${action} error:`, error);
      return {
        success: false,
        message: error.message,
        error: error,
      };
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleUpdateTutorData = (updatedData) => {
    // Update local storage with new user data if profile was updated
    if (updatedData.profile) {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = {
        ...currentUser,
        firstName: updatedData.profile.firstName || currentUser.firstName,
        lastName: updatedData.profile.lastName || currentUser.lastName,
        phone: updatedData.profile.phone || currentUser.phone,
        photo: updatedData.profile.image || currentUser.photo,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    setTutorData((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!tutorData) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-4 md:p-6 sticky top-0 h-fit md:h-screen shadow-lg z-10 flex flex-col">
        <div className="flex flex-col items-center mb-6 relative">
          <div className="relative">
            <img
              src={tutorData.profile.image}
              alt="Profile"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mb-3 border-2 border-white"
            />
            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploadingImage}
              />
              {isUploadingImage ? (
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              )}
            </label>
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-center">
            {tutorData.profile.firstName} {tutorData.profile.lastName}
          </h2>
          <p className="text-xs md:text-sm text-blue-100 text-center">
            {tutorData.profile.email}
          </p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all ${
              activeSection === "dashboard"
                ? "bg-blue-700"
                : "hover:bg-blue-700"
            }`}
          >
            <FiHome className="mr-3 text-lg" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveSection("profile")}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all ${
              activeSection === "profile" ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            <FiUser className="mr-3 text-lg" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveSection("availability")}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all ${
              activeSection === "availability"
                ? "bg-blue-700"
                : "hover:bg-blue-700"
            }`}
          >
            <FiCalendar className="mr-3 text-lg" />
            <span>Availability</span>
          </button>

          <button
            onClick={() => setActiveSection("teachingStyle")}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all ${
              activeSection === "teachingStyle"
                ? "bg-blue-700"
                : "hover:bg-blue-700"
            }`}
          >
            <FiBook className="mr-3 text-lg" />
            <span>Teaching Style</span>
          </button>
        </nav>

        {/* Logout button moved to the bottom with flex-grow pushing it down */}
        <div className="flex-grow"></div>
        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-3 mt-auto text-white hover:text-red-300 transition-all"
        >
          <FiLogOut className="mr-3 text-lg" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-4 md:p-8 lg:p-10 overflow-y-auto">
        {activeSection === "dashboard" && (
          <>
            {/* Profile Info */}
            <section className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
                <FiUser className="mr-2" /> Profile Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">
                    <strong>Name:</strong> {tutorData.profile.firstName}{" "}
                    {tutorData.profile.lastName}
                  </p>
                  <p className="mb-2">
                    <strong>Email:</strong> {tutorData.profile.email}
                  </p>
                  <p className="mb-2">
                    <strong>Phone:</strong>{" "}
                    {tutorData.profile.phone || "Not provided"}
                  </p>
                  <p className="mb-2">
                    <strong>Location:</strong>{" "}
                    {tutorData.profile.location.address},{" "}
                    {tutorData.profile.location.city},{" "}
                    {tutorData.profile.location.region}
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Bio:</strong> {tutorData.profile.bio}
                  </p>
                  <p className="mb-2">
                    <strong>Education:</strong>{" "}
                    {Array.isArray(tutorData.profile.education)
                      ? tutorData.profile.education.join(", ")
                      : tutorData.profile.education}
                  </p>
                  <p className="mb-2">
                    <strong>Rating:</strong> {tutorData.profile.ratingsAverage}{" "}
                    ({tutorData.profile.ratingsQuantity} reviews)
                  </p>
                </div>
              </div>
            </section>

            {/* Availability */}
            <section className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
                <FiClock className="mr-2" /> Availability
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">General Availability</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p>
                        <strong>Weekdays:</strong>{" "}
                        {
                          tutorData.availability.generalAvailability?.weekdays
                            ?.start
                        }{" "}
                        -{" "}
                        {
                          tutorData.availability.generalAvailability?.weekdays
                            ?.end
                        }
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Weekends:</strong>{" "}
                        {
                          tutorData.availability.generalAvailability?.weekends
                            ?.start
                        }{" "}
                        -{" "}
                        {
                          tutorData.availability.generalAvailability?.weekends
                            ?.end
                        }
                      </p>
                    </div>
                  </div>
                  {tutorData.availability.generalAvailability?.notes && (
                    <p className="mt-2">
                      <strong>Notes:</strong>{" "}
                      {tutorData.availability.generalAvailability.notes}
                    </p>
                  )}
                </div>

                {tutorData.availability.specificSlots?.length > 0 && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Specific Exceptions</h4>
                    <div className="space-y-2">
                      {tutorData.availability.specificSlots.map(
                        (slot, index) => (
                          <div key={index} className="border-b pb-2">
                            <p>
                              <strong>
                                {slot.day} (Day {slot.date}):
                              </strong>
                            </p>
                            {slot.slots.map((time, i) => (
                              <p key={i} className="ml-4">
                                {time.start} - {time.end}
                              </p>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Teaching Style */}
            <section className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
                <FiAward className="mr-2" /> Teaching Style
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">
                    <strong>Approach:</strong>{" "}
                    {tutorData.teachingStyle.approach}
                  </p>
                  <p className="mb-2">
                    <strong>Methods:</strong>{" "}
                    {Array.isArray(tutorData.teachingStyle.methods)
                      ? tutorData.teachingStyle.methods.join(", ")
                      : tutorData.teachingStyle.methods}
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Experience:</strong>{" "}
                    {tutorData.teachingStyle.experience}
                  </p>
                  <p className="mb-2">
                    <strong>Specialties:</strong>{" "}
                    {tutorData.teachingStyle.specialties}
                  </p>
                </div>
              </div>
            </section>

            {activeSection === "dashboard" && (
              <section className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
                  <FiBookmark className="mr-2" /> Upcoming Bookings
                </h3>

                <div className="space-y-4">
                  {tutorData.bookings.length > 0 ? (
                    tutorData.bookings.map((booking) => {
                      return (
                        <div
                          key={booking.id}
                          className="border p-4 rounded-lg bg-gray-50"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                            <div>
                              <p>
                                <strong>Student:</strong>{" "}
                                {booking.student || "Unknown"}
                              </p>
                              <p>
                                <strong>Date:</strong> {booking.date}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Time:</strong> {booking.time}
                              </p>
                              <p>
                                <strong>Subject:</strong> {booking.subject}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs ${
                                  booking.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {booking.status}
                              </span>

                              {/* FORCE SHOW BUTTONS FOR TESTING */}
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handleBookingAction(booking.id, "confirmed")
                                  }
                                  className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() =>
                                    handleBookingAction(booking.id, "rejected")
                                  }
                                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                                >
                                  Reject
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500">No upcoming bookings</p>
                  )}
                </div>
              </section>
            )}
          </>
        )}

        {activeSection === "profile" && (
          <ProfileManage
            tutorData={tutorData}
            tutorId={tutorId}
            token={token}
            setTutorData={setTutorData}
            onUpdate={handleUpdateTutorData}
          />
        )}

        {activeSection === "availability" && (
          <AvailabilitySettings
            tutorData={tutorData}
            tutorId={tutorId}
            token={token}
            setTutorData={setTutorData}
            onUpdate={handleUpdateTutorData}
          />
        )}

        {activeSection === "teachingStyle" && (
          <TeachingStyleForm
            tutorData={tutorData}
            tutorId={tutorId}
            token={token}
            setTutorData={setTutorData}
            onUpdate={handleUpdateTutorData}
          />
        )}
      </main>
    </div>
  );
};

export default TutorDash;
